import { eq, sql, and } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'

export default eventHandler(async (event) => {
  const db = useDatabase()
  const { user: currentUser } = await requireUserSession(event)
  const user = currentUser as any

  const patientUser = alias(tables.users, 'patient_user')
// console.log(patientUser,'this from me patientuser');

  // ✅ Get pagination query params from request
  const { page = '1', perPage = '10' } = getQuery(event)
  const pageNum = parseInt(page as string, 10)
  const perPageNum = parseInt(perPage as string, 10)
  const offset = (pageNum - 1) * perPageNum

  // ✅ Base query with optional filter
  const query = db
    .select({
      id: tables.patients.id,
      user_id: tables.patients.user_id,
      dob: tables.patients.dob,
      gender: tables.patients.gender,
      medical_history: tables.patients.medical_history,
      patient_name: sql<string>`patient_user.name as patient_name`,
    })
    .from(tables.patients)
    .leftJoin(patientUser, eq(tables.patients.user_id, patientUser.id))
    .where(user.role === 'patient' ? eq(tables.patients.user_id, user.id) : sql`1=1`)

  // ✅ Total count for pagination (with same filter as main query)
  const totalResult = await db
    .select({ count: sql<number>`count(*)`.as('count') })
    .from(tables.patients)
    .where(user.role === 'patient' ? eq(tables.patients.user_id, user.id) : sql`1=1`)
    .get();
  const total = totalResult?.count || 0;

  // ✅ Fetch paginated data
  const patients = await query
    .limit(perPageNum)
    .offset(offset)
    .all()

  return {
    data: patients,
    pagination: {
      page: pageNum,
      perPage: perPageNum,
      total,
      totalPages: Math.ceil(total / perPageNum),
    }
  }
})
 