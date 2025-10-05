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
      name: z.string().optional(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      address: z.string().optional(),
    })
  )
  const { name, email, phone, password } = body

  const user = await db
    .select()
    .from(tables.users)
    .where(eq(tables.users.id, id))
    .get()

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }

  const updatedUser = await db
    .update(tables.users)
    .set({
      id,
      name,
      email,
      phone,
      password,
    })
    .where(eq(tables.users.id, id))
    .returning()
    .get()

  return updatedUser
})
