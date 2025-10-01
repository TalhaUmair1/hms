import { eq } from 'drizzle-orm'
import { zh } from 'h3-zod'

export default eventHandler(async (event) => {
  const db = await useDatabase()

  const error = createError({
    statusCode: 404,

    message: 'Appointment not found',
  })

  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })

  const apoinment = await db
    .delete(tables.appointments)
    .where(eq(tables.appointments.id, id))

  if (!apoinment) {
    throw error
  }

  return apoinment
})
