import { eq, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import { canReadPatients } from '~~/shared/abilities/patients'

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  await authorize(event, canReadPatients)

  const db = useDatabase()

  // ✅ Alias for user table
  const patientUser = alias(tables.users, 'patient_user')

  // ✅ Query all patients with joined user names
  const patients = await db
    .select({
      id: tables.patients.id,
      user_id: tables.patients.user_id,
      dob: tables.patients.dob,
      gender: tables.patients.gender,
      medical_history: tables.patients.medical_history,
      patient_name: sql<string>`patient_user.name as patient_name`,
    })
    .from(tables.patients)
    .leftJoin(patientUser, eq(tables.patients.user_id, patientUser.id))
    .all()

  return patients
})
