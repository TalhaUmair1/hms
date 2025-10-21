import { zh } from 'h3-zod'
import { eq, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import { canReadPrescription } from '~~/shared/abilities/prescriptions'

export default eventHandler(async (event) => {
  const db = useDatabase()

  // ✅ Validate param using h3-zod
  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })

  await authorize(event, canReadPrescription)

  // ✅ Create table aliases for users
  const doctorUser = alias(tables.users, 'doctor_user')
  const patientUser = alias(tables.users, 'patient_user')

  // ✅ Query with joins and aliases
  const prescription = await db
    .select({
      id: tables.prescriptions.id,
      appointment_id: tables.prescriptions.appointment_id,
      doctor_id: tables.prescriptions.doctor_id,
      patient_id: tables.prescriptions.patient_id,
      medicine_list: tables.prescriptions.medicine_list,
      notes: tables.prescriptions.notes,
      patient_name: sql<string>`patient_user.name as patient_name`,
      doctor_name: sql<string>`doctor_user.name as doctor_name`,
    })
    .from(tables.prescriptions)
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
    .where(eq(tables.prescriptions.id, id))
    .get()

  if (!prescription) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Prescription not found',
    })
  }

  return prescription
})
