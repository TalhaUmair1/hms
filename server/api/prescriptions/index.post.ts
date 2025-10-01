import { zh } from 'h3-zod'
import z from 'zod'

export default eventHandler(async (event) => {
  const body = await zh.useValidatedBody(
    event,
    z.object({
      appointment_id: z.number().int(),
      doctor_id: z.number().int(),
      patient_id: z.number().int(),
      medicine_list: z.string(),
      notes: z.string(),
    })
  )
  const { appointment_id, doctor_id, patient_id, medicine_list, notes } = body

  const prescription = await useDatabase()
    .insert(tables.prescriptions)
    .values({
      appointment_id,
      doctor_id,
      patient_id,
      medicine_list,
      notes,
    })
    .returning()
    .get()

  return prescription
})
