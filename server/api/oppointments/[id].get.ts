import { zh } from 'h3-zod'
import { id } from 'zod/locales'
import { eq } from 'drizzle-orm'

import { canReadPersonalppointments } from './../../../shared/abilities/appointments'

export default eventHandler(async (event) => {
  const db = useDatabase()

  const notFoundError = createError({
    statusCode: 404,
    message: 'Appointment not found',
  })

  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })
  await authorize(event, canReadPersonalppointments)

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
