import { eq } from 'drizzle-orm'
import { zh, z } from 'h3-zod'
import { canReadDoctor } from '~~/shared/abilities/doctors'

const invalidCredentialsError = createError({
  statusCode: 404,
  // This message is intentionally vague to prevent user enumeration attacks.
  message: 'Doctor not found',
})

export default defineEventHandler(async (event) => {
  const db = useDatabase()

  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })
  await authorize(event, canReadDoctor)
  const doctor = await db
    .select({
      id: tables.doctors.id,
      specialization: tables.doctors.specialization,
      fees: tables.doctors.fees,
      availability: tables.doctors.availability,
      name: tables.users.name,
      email: tables.users.email,
    })
    .from(tables.doctors)
    .leftJoin(tables.users, eq(tables.doctors.user_id, tables.users.id))
    .where(eq(tables.doctors.id, id))

  if (!doctor) {
    throw invalidCredentialsError
  }

  return doctor
})
