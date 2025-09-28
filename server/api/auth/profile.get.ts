import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const user = await getUserSession(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      // This message is intentionally vague to prevent user enumeration attacks.
      message: 'Unauthorized',
    })
  }
  return user
})
