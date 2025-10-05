import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event)
  console.log('user in profile', user)
  if (!user) {
    throw createError({
      statusCode: 401,
      // This message is intentionally vague to prevent user enumeration attacks.
      message: 'Unauthorized',
    })
  }

  const db = useDatabase()

  const updatedUser = await db
    .select({
      id: tables.users.id,
      name: tables.users.name,
      email: tables.users.email,
      phone: tables.users.phone,
      address: tables.users.address,
    })
    .from(tables.users)
    .where(eq(tables.users.id, Number(user.id)))
    .get()
  console.log('updatedUser', updatedUser)

  if (!updatedUser) {
    throw createError({
      statusCode: 404,
      message: 'User not found',
    })
  }

  return updatedUser
})
