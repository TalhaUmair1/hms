import { zh } from 'h3-zod'
import { eq, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import { canReadPrescription } from '~~/shared/abilities/prescriptions'


export default eventHandler(async (event) => {
  const db = useDatabase()

  const { user: currentUser } = await requireUserSession(event) as any
  const userId = Number(currentUser.id)

  // await authorize(event, canReadPrescription)

  // ✅ Create table aliases for users
  const patientUser = alias(tables.users, 'patient_user')
  const doctorUser = alias(tables.users, 'doctor_user')

  // ✅ Query with joins and aliases
  const prescriptions = await db
    .select({
      id: tables.prescriptions.id,
      patient_id: tables.prescriptions.patient_id,
      doctor_id: tables.prescriptions.doctor_id,
      appointment_id: tables.prescriptions.appointment_id,
      medicine_list: tables.prescriptions.medicine_list,
      notes: tables.prescriptions.notes,
      date: tables.appointments.date,
      status: tables.appointments.status,
      patient_name: sql<string>`patient_user.name as patient_name`,
      doctor_name: sql<string>`doctor_user.name as doctor_name`,
    })
    .from(tables.prescriptions)
    .leftJoin(tables.appointments, eq(tables.prescriptions.appointment_id, tables.appointments.id))
    // join → doctor → user
    .leftJoin(
      tables.doctors,
      eq(tables.prescriptions.doctor_id, tables.doctors.id)
    )
    .leftJoin(doctorUser, eq(tables.doctors.user_id, doctorUser.id))
    // join → patient → user
    .leftJoin(
      tables.patients,
      eq(tables.prescriptions.patient_id, tables.patients.id)
    )
    .leftJoin(patientUser, eq(tables.patients.user_id, patientUser.id))
    .where(eq(tables.patients.user_id, userId))
    .all()
   console.log(prescriptions,"prescriptions me");
  return prescriptions
})
