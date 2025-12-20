import { zh } from 'h3-zod'
import { eq, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'

export default eventHandler(async (event) => {
  const db = useDatabase()

  const {user:currentUser} = await requireUserSession(event)
console.log(currentUser,'current user in me patient');
  // ✅ Alias users table for clarity
  const patientUser = alias(tables.users, 'patient_user')

  // ✅ Query patient with joined user name
  const patient = await db
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
    .where(eq(tables.patients.user_id, currentUser.id))
    .get()
   console.log(patient,'patient in me');
  if (!patient) {
    throw createError({
      statusCode: 404,
      message: 'Patient not found',
    })
  }

  return patient
})
