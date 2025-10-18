import { zh, z } from 'h3-zod'

import { canCreateappointments } from './../../../shared/abilities/appointments'

export default eventHandler(async (event) => {
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

  // Insert todo for the current user
  await authorize(event, canCreateappointments)
  const appointment = await useDatabase()
    .insert(tables.appointments)
    .values({
      doctor_id,
      patient_id,
      date,
      status,
    })
    .returning()
    .get()

  return appointment
})
