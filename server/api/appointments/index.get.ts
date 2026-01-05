import { eq, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import { canReadappointments } from '~~/shared/abilities/appointments'

export default eventHandler(async (event) => {
  await authorize(event, canReadappointments)

  const db = useDatabase()

  // ✅ Pagination defaults
  const { page = '1', perPage = '2' } = getQuery(event)
  const currentPage = Number(page)
  const limit = Number(perPage)
  const offset = (currentPage - 1) * limit

  // ✅ Get query parameters
  const { q } = getQuery(event)
  
  // ✅ Aliases
  const patientUser = alias(tables.users, 'patient_user')
  const doctorUser = alias(tables.users, 'doctor_user')

  // ✅ Base query
  const baseQuery = db
    .select({
      id: tables.appointments.id,
      date: tables.appointments.date,
      status: tables.appointments.status,
      patient_id: tables.appointments.patient_id,
      doctor_id: tables.appointments.doctor_id,
      patient_name: sql<string>`patient_user.name as patient_name`,
      doctor_name: sql<string>`doctor_user.name as doctor_name`,
    })
    .from(tables.appointments)
    .leftJoin(
      tables.patients,
      eq(tables.appointments.patient_id, tables.patients.id)
    )
    .leftJoin(patientUser, eq(tables.patients.user_id, patientUser.id))
    .leftJoin(
      tables.doctors,
      eq(tables.appointments.doctor_id, tables.doctors.id)
    )
    .leftJoin(doctorUser, eq(tables.doctors.user_id, doctorUser.id))
    
  // ✅ Apply search filter if query parameter exists
  if (q) {
    baseQuery.where(sql`UPPER(${patientUser.name}) LIKE ${`%${q}%`.toUpperCase()} OR UPPER(${doctorUser.name}) LIKE ${`%${q}%`.toUpperCase()}`)
  }

  // ✅ Get paginated data
  const appointments = await baseQuery
    .limit(limit)
    .offset(offset)
    .all()

  // ✅ Total records count
  const [{ total }] = await db
    .select({
      total: sql<number>`count(${tables.appointments.id}) as total`,
    })
    .from(tables.appointments)

  // ✅ Final response
  const result = {
    data: appointments,
    pagination: {
      page: currentPage,
      perPage: limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
 console.log(result,'checking result pagination from appointments');
 
  return result
})
