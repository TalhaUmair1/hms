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
    .select()
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
