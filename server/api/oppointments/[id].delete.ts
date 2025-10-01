import { eq } from 'drizzle-orm'
import { zh } from 'h3-zod'

export default eventHandler(async (event) => {
  const db = useDatabase()

  const invalidCredentialsError = createError({
    statusCode: 404,
    // This message is intentionally vague to prevent user enumeration attacks.
    message: 'Appointment not found',
  })
  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })

  const appointment = await db
    .delete(tables.appointments)
    .where(eq(tables.appointments.id, id))

  if (!appointment) {
    throw invalidCredentialsError
  }

  return appointment
})
