import { eq } from 'drizzle-orm'
import { canReadDoctor } from '~~/shared/abilities/doctors'

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  await authorize(event, canReadDoctor)

  const doctors = await useDatabase()
    .select({
      id: tables.doctors.id,
      user_id: tables.doctors.user_id,
      specialization: tables.doctors.specialization,
      fees: tables.doctors.fees,
      availability: tables.doctors.availability,
      name: tables.users.name,
      email: tables.users.email,
    })
    .from(tables.doctors)
    .leftJoin(tables.users, eq(tables.doctors.user_id, tables.users.id))
    .all()

  return doctors as Doctor[]
})
