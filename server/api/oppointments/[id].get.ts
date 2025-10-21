import { eq, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import { canReadappointments } from '~~/shared/abilities/appointments'

export default eventHandler(async (event) => {
  await authorize(event, canReadappointments)

  const appointmentId = Number(event.context.params?.id)
  if (!appointmentId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Appointment ID is required',
    })
  }

  // ✅ Proper aliases for user tables
  const patientUser = alias(tables.users, 'patient_user')
  const doctorUser = alias(tables.users, 'doctor_user')

  const db = useDatabase()

  const appointment = await db
    .select({
      id: tables.appointments.id,
      date: tables.appointments.date,
      status: tables.appointments.status,
      // ✅ Force explicit SQL column aliases (works 100% in SQLite)
      patient_name: sql<string>`patient_user.name as patient_name`,
      doctor_name: sql<string>`doctor_user.name as doctor_name`,
    })
    .from(tables.appointments)
    .leftJoin(
      tables.patients,
      eq(tables.appointments.patient_id, tables.patients.id)
    )
    .leftJoin(patientUser, eq(tables.patients.user_id, patientUser.id))
    .leftJoin(
      tables.doctors,
      eq(tables.appointments.doctor_id, tables.doctors.id)
    )
    .leftJoin(doctorUser, eq(tables.doctors.user_id, doctorUser.id))
    .where(eq(tables.appointments.id, appointmentId))
    .get()

  if (!appointment) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Appointment not found',
    })
  }

  return appointment
})
