import { eq, sql } from 'drizzle-orm'
import { zh } from 'h3-zod'
import z from 'zod'
import { alias } from 'drizzle-orm/sqlite-core'
import { canUpdateappointments } from '~~/shared/abilities/appointments'

export default eventHandler(async (event) => {
  const db = useDatabase()

  // ✅ Validate route params
  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })

  // ✅ Validate body
  const body = await zh.useValidatedBody(
    event,
    z.object({
      doctor_id: z.number().int(),
      patient_id: z.number().int(),
      date: z.string(),
      status: z.enum(['pending', 'confirmed', 'completed', 'canceled']),
    })
  )
  const { doctor_id, patient_id, date, status } = body

  // ✅ Authorization
  await authorize(event, canUpdateappointments)

  // ✅ Update appointment record
  await db
    .update(tables.appointments)
    .set({ doctor_id, patient_id, date, status })
    .where(eq(tables.appointments.id, id))
    .run()

  // ✅ Create aliases for users (doctor + patient)
  const doctorUser = alias(tables.users, 'doctor_user')
  const patientUser = alias(tables.users, 'patient_user')

  // ✅ Fetch updated appointment with doctor & patient names
  const updatedAppointment = await db
    .select({
      id: tables.appointments.id,
      date: tables.appointments.date,
      status: tables.appointments.status,
      doctor_id: tables.appointments.doctor_id,
      patient_id: tables.appointments.patient_id,
      doctor_name: sql<string>`doctor_user.name`.as('doctor_name'),
      patient_name: sql<string>`patient_user.name`.as('patient_name'),
    })
    .from(tables.appointments)
    .leftJoin(tables.doctors, eq(tables.appointments.doctor_id, tables.doctors.id))
    .leftJoin(doctorUser, eq(tables.doctors.user_id, doctorUser.id))
    .leftJoin(tables.patients, eq(tables.appointments.patient_id, tables.patients.id))
    .leftJoin(patientUser, eq(tables.patients.user_id, patientUser.id))
    .where(eq(tables.appointments.id, id))
    .get()

  return updatedAppointment
})
