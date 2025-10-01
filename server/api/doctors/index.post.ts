import { zh, z } from 'h3-zod';

export default eventHandler(async (event) => {
  const body = await zh.useValidatedBody(
    event,
    z.object({
      specialization: z.string().min(3).max(100),
      user_id: z.number().int(),
      fees: z.number(),
      availability: z.string(),
    })
  )
  const { specialization, user_id, fees, availability } = body

  // Insert todo for the current user
  const doctor = await useDatabase()
    .insert(tables.doctors)
    .values({
      specialization,
      user_id,
      availability,
      fees,
    })
    .returning()
    .get()

  return doctor
})
