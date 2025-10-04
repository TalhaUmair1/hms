import { eq } from 'drizzle-orm'
import { zh, z } from 'h3-zod'
import { canDeleteDoctor } from '~~/shared/abilities/doctors'

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
  await authorize(event, canDeleteDoctor)
  const doctor = await db
    .delete(tables.doctors)
    .where(eq(tables.doctors.id, id))

  if (!doctor) {
    throw invalidCredentialsError
  }

  return doctor
})
