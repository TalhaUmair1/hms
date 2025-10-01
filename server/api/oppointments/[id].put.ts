import { eq } from 'drizzle-orm'
import { zh } from 'h3-zod'
import z from 'zod'

export default eventHandler(async (event) => {
  const db = useDatabase()

  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })

  const body = await zh.useValidatedBody(
    event,
    z.object({
      doctor_id: z.number().int(),
      patient_id: z.number().int(),
      date: z.string(),
    })
  )
  const { doctor_id, patient_id, date } = body

  const appointment = await db
    .update(tables.appointments)
    .set({ doctor_id, patient_id, date })
    .where(eq(tables.appointments.id, id))
    .returning()
    .get()
  return appointment
})
