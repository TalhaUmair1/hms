import { id } from 'zod/locales'
import { canReadPatients } from './../../../shared/abilities/patients'
import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  await authorize(event, canReadPatients)

  const patients = await useDatabase()
    .select({
      name: tables.users.name,
      id: tables.patients.id,
      user_id: tables.patients.user_id,
      dob: tables.patients.dob,
      gender: tables.patients.gender,
      medical_history: tables.patients.medical_history,
    })
    .from(tables.patients)
    .leftJoin(tables.users, eq(tables.patients.user_id, tables.users.id))
    .all()

  return patients
})
