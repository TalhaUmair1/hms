import { eq } from 'drizzle-orm'
export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  // List doctors for the current user
  const doctors = await useDatabase().select().from(tables.doctors).all()

  return doctors as Doctor[]
})
