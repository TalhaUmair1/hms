// import { eq } from 'drizzle-orm'
// import { canReadDoctor } from '~~/shared/abilities/doctors'
export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  //   await authorize(event, canReadDoctor)
  // List doctors for the current user
  const users = await useDatabase()
    .select({
      id: tables.users.id,
      name: tables.users.name,
    })
    .from(tables.users)
    .all()

  console.log('Users fetched from database:', users)
  return users
})
