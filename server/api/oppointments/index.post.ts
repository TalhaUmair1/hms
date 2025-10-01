import { zh, z } from 'h3-zod'
import { id } from 'zod/locales'

export default eventHandler(async (event) => {
  const body = await zh.useValidatedBody(
    event,
    z.object({
      id: z.number().int(),
      doctor_id: z.number().int(),
      patient_id: z.number().int(),
      date: z.string(),
    })
  )
  const { id, doctor_id, patient_id, date, status } = body

  // Insert todo for the current user
  const appointment = await useDatabase()
    .insert(tables.appointments)
    .values({
      id,
      doctor_id,
      patient_id,
      date,
    })
    .returning()
    .get()

  return appointment
})
