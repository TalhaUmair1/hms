import { eq } from 'drizzle-orm'
import { zh } from 'h3-zod'
import z from 'zod'
import { canUpdateUser } from '~~/shared/abilities/user'

export default eventHandler(async (event) => {
  const db = useDatabase()

  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })

  const body = await zh.useValidatedBody(
    event,
    z.object({
      name: z.string(),
      email: z.string().email(),
      phone: z.string().optional(),
      address: z.string().optional(),
    })
  )
  const { name, email, phone, address } = body

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
  await authorize(event, canUpdateUser, user)

  const updatedUser = await db
    .update(tables.users)
    .set({
      id,
      name,
      email,
      phone,
      address,
    })
    .where(eq(tables.users.id, id))
    .returning({
      id: tables.users.id,
      name: tables.users.name,
      email: tables.users.email,
      phone: tables.users.phone,
      address: tables.users.address,
    })
    .get()

  // set user session if the updated user is the current user
  await setUserSession(event, {
    user: {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: user.role,
    },
    loggedInAt: Date.now(),
  })
  return updatedUser
})
