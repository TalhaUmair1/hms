import { eq, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import { canReadPrescription } from '~~/shared/abilities/prescriptions'

export default eventHandler(async (event) => {
  await authorize(event, canReadPrescription)

  // Aliases for user table
  const doctorUser = alias(tables.users, 'doctor_user')
  const patientUser = alias(tables.users, 'patient_user')

  const db = useDatabase()

  const prescriptions = await db
    .select({
      id: tables.prescriptions.id,
      appointment_id: tables.prescriptions.appointment_id,
      doctor_id: tables.prescriptions.doctor_id,
      patient_id: tables.prescriptions.patient_id,
      medicine_list: tables.prescriptions.medicine_list,
      notes: tables.prescriptions.notes,

      // ✅ use explicit SQL aliases with the same alias name
      patient_name: sql<string>`patient_user.name as patient_name`,
      doctor_name: sql<string>`doctor_user.name as doctor_name`,
    })
    .from(tables.prescriptions)
    // join → doctors
    .leftJoin(
      tables.doctors,
      eq(tables.prescriptions.doctor_id, tables.doctors.id)
    )
    // join → doctor_user (via doctors.user_id)
    .leftJoin(doctorUser, eq(tables.doctors.user_id, doctorUser.id))
    // join → patients
    .leftJoin(
      tables.patients,
      eq(tables.prescriptions.patient_id, tables.patients.id)
    )
    // join → patient_user (via patients.user_id)
    .leftJoin(patientUser, eq(tables.patients.user_id, patientUser.id))
    .all()

  return prescriptions
})
