import { zh } from 'h3-zod'
import { id } from 'zod/locales'
import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const db = useDatabase()

  const notFoundError = createError({
    statusCode: 404,
    message: 'Appointment not found',
  })

  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })

  const appointment = await db
    .select()
    .from(tables.appointments)
    .where(eq(tables.appointments.id, id))
    .get()

  if (!appointment) {
    throw notFoundError
  }

  return appointment
})
