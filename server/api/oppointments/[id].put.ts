import { eq } from 'drizzle-orm'
import { zh } from 'h3-zod'
import z from 'zod'
import { canUpdateappointments } from '~~/shared/abilities/appointments'

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
      status: z.enum(['pending', 'confirmed', 'completed', 'canceled']),
    })
  )
  const { doctor_id, patient_id, date, status } = body

  await authorize(event, canUpdateappointments)

  const appointment = await db
    .update(tables.appointments)
    .set({ doctor_id, patient_id, date, status })
    .where(eq(tables.appointments.id, id))
    .returning()
    .get()
  return appointment
})
