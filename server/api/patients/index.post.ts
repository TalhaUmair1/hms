import { zh, z } from 'h3-zod'
import { canCreatePatients } from './../../../shared/abilities/patients'

export default eventHandler(async (event) => {
  const body = await zh.useValidatedBody(
    event,
    z.object({
      user_id: z.number().int(),
      dob: z.string(),
      gender: z.string(),
      medical_history: z.string(),
    })
  )
  const { user_id, dob, gender, medical_history } = body

  await authorize(event, canCreatePatients)

  const patient = await useDatabase()
    .insert(tables.patients)
    .values({
      user_id,
      dob,
      gender,
      medical_history,
    })
    .returning()
    .get()

  return patient
})
