import { z } from 'zod'

export default eventHandler(async (event) => {
  const body = await readValidatedBody(
    event,
    z.object({
      // title: z.string().min(1).max(100),
      specialization: z.string().min(3).max(100),
      user_id: z.int(),
      fees: z.number(),
      availability: z.string(),
    }).parse
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
