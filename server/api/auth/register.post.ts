import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const db = useDatabase()
  const { name, email, password } = await readValidatedBody(
    event,
    z.object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(8),
    }).parse
  )

  const hashedPassword = await hashPassword(password)

  const user = await db
    .insert(tables.users)
    .values({
      name,
      email,
      password: hashedPassword,
      role: 'patient', // Default role for new registrations
    })
    .returning()
    .get()

  // In real applications, you should send a confirmation email to the user before logging them in.

  await setUserSession(event, {
    user: {
      id: user.id,
      name,
      email,
      role: user.role,
    },
    loggedInAt: Date.now(),
  })

  return setResponseStatus(event, 201)
})
