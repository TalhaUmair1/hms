import { eq, sql, and } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'

export default eventHandler(async (event) => {
  const db = useDatabase()
  const { user: currentUser } = await requireUserSession(event)
  const user = currentUser as any

  const patientUser = alias(tables.users, 'patient_user')

  // ✅ Get pagination query params from request
  const { page = '1', perPage = '10' } = getQuery(event)
  const pageNum = parseInt(page as string, 10)
  const perPageNum = parseInt(perPage as string, 10)
  const offset = (pageNum - 1) * perPageNum

  // ✅ Base query
  let query = db
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

  // ✅ Optional: filter by current user if role is 'patient'
  if (user.role === 'patient') {
    query = query.where(eq(tables.patients.user_id, user.id))
  }

  // ✅ Total count for pagination
  const total = await db
    .select({ count: sql<number>`count(*)` })
    .from(tables.patients)
    .get()
    .then(r => r?.count || 0)

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
 