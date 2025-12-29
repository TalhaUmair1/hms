import { eq, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import { canReadPatients } from '~~/shared/abilities/patients'

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  await authorize(event, canReadPatients)

  const db = useDatabase()

  // ✅ Pagination defaults
  const { page = '1', perPage = '2' } = getQuery(event)

  const currentPage = Number(page)
  const limit = Number(perPage)
  const offset = (currentPage - 1) * limit

  // ✅ Alias for user table
  const patientUser = alias(tables.users, 'patient_user')

  // ✅ Base query
  const baseQuery = db
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

  // ✅ Get paginated data
  const patients = await baseQuery
    .limit(limit)
    .offset(offset)
    .all()

  // ✅ Total records count
  const [{ total }] = await db
    .select({
      total: sql<number>`count(${tables.patients.id}) as total`,
    })
    .from(tables.patients)

  // ✅ Final response
  const result = {
    data: patients as Patient[],
    pagination: {
      page: currentPage,
      perPage: limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
console.log(result,'geting patients from pateint api as result');

  return result
})
