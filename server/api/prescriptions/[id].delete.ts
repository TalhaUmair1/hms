import { eq } from 'drizzle-orm'
import { zh } from 'h3-zod'
import { canDeletepresception } from '~~/shared/abilities/prescriptions'

export default eventHandler(async (event) => {
  const db = await useDatabase()

  const error = createError({
    statusCode: 404,

    message: 'Appointment not found',
  })

  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })

  await authorize(event, canDeletepresception)
  const apoinment = await db
    .delete(tables.appointments)
    .where(eq(tables.appointments.id, id))

  if (!apoinment) {
    throw error
  }

  return apoinment
})
