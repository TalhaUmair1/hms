import { eq } from 'drizzle-orm'
import { zh, z } from 'h3-zod'
import { canUpdateDoctor } from '~~/shared/abilities/doctors'

const notFoundError = createError({
  statusCode: 404,
  message: 'Doctor not found',
})

export default defineEventHandler(async (event) => {
  // We are no longer using useDatabase()
  // const db = useDatabase()

  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })

  const body = await zh.useValidatedBody(
    event,
    z.object({
      specialization: z.string().min(3).max(100).optional(),
      fees: z.number().optional(),
      availability: z.string().optional(),
      name: z.string().optional(),
      email: z.string().optional(),
    })
  )
  const db = useDatabase()
  const { specialization, fees, availability, name, email } = body
  const existingDoctor = await db
    .select({
      id: tables.doctors.id,
      specialization: tables.doctors.specialization,
      fees: tables.doctors.fees,
      availability: tables.doctors.availability,
      user_id: tables.doctors.user_id,
      name: tables.users.name,
      email: tables.users.email,
    })
    .from(tables.doctors)
    .leftJoin(tables.users, eq(tables.doctors.user_id, tables.users.id))
    .where(eq(tables.doctors.id, id))
    .get()

  if (!existingDoctor) {
    throw notFoundError
  }
  const result = await authorize(event, canUpdateDoctor, existingDoctor)
  console.log('authorize result', result)
  const updatedDoctor = await db
    .update(tables.doctors)
    .set({
      specialization: specialization ?? existingDoctor.specialization,
      fees: fees ?? existingDoctor.fees,
      availability: availability ?? existingDoctor.availability,
    })
    .where(eq(tables.doctors.id, id))
    .returning()
    .get()

  if (name || email) {
    await db
      .update(tables.users)
      .set({
        name: name ?? existingDoctor.name,
        email: email ?? existingDoctor.email,
      })
      .where(eq(tables.users.id, existingDoctor.user_id ?? 0))
  }

  return updatedDoctor
})
