// import { eq } from 'drizzle-orm'
// import { canReadDoctor } from '~~/shared/abilities/doctors'
export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  //   await authorize(event, canReadDoctor)
  // List doctors for the current user
  const users = await useDatabase().select().from(tables.users).all()

  return users
})
