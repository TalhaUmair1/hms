import { eq, count, sql } from 'drizzle-orm'
import { canReadDoctor } from '~~/shared/abilities/doctors'

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  await authorize(event, canReadDoctor)

  const db = useDatabase()

  // ✅ Pagination defaults
  const { page = '1', perPage = '2' } = getQuery(event)

  const currentPage = Number(page)
  const limit = Number(perPage)
  const offset = (currentPage - 1) * limit

  // ✅ Base query
  const baseQuery = db
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
    .leftJoin(
      tables.users,
      eq(tables.doctors.user_id, tables.users.id)
    )

  // ✅ Get paginated data
  const doctors = await baseQuery
    .limit(limit)
    .offset(offset)
    .all()

  // ✅ Total records count
  const [{ total }] = await db
    .select({ total: sql<number>`count(${tables.doctors.id}) as total` })
    .from(tables.doctors)

  // ✅ Prepare response
  const result = {
    data: doctors as Doctor[],
    pagination: {
      page: currentPage,
      perPage: limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
  console.log(result,"paginated doctors")
  return result
})
