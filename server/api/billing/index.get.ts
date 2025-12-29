import { eq, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'

export default eventHandler(async (event) => {
  const db = useDatabase()

  // ✅ Pagination defaults
  const { page = '1', perPage = '10' } = getQuery(event)
  const currentPage = Number(page)
  const limit = Number(perPage)
  const offset = (currentPage - 1) * limit

  // ✅ Alias for user table
  const patientUser = alias(tables.users, 'patient_user')

  // ✅ Base query
  const baseQuery = db
    .select({
      id: tables.billing.id,
      appointment_id: tables.billing.appointment_id,
      patient_id: tables.billing.patient_id,
      amount: tables.billing.amount,
      status: tables.billing.status,
      payment_method: tables.billing.payment_method,
      appointment_date: tables.appointments.date,
      patient_name: patientUser.name,
      // patient_email: patientUser.email,
    })
    .from(tables.billing)
    .leftJoin(
      tables.patients,
      eq(tables.billing.patient_id, tables.patients.id)
    )
    .leftJoin(patientUser, eq(tables.patients.user_id, patientUser.id))
    .leftJoin(
      tables.appointments,
      eq(tables.billing.appointment_id, tables.appointments.id)
    )

  // ✅ Get paginated data
  const billings = await baseQuery
    .limit(limit)
    .offset(offset)
    .all()

  // ✅ Total records count
  const [{ total }] = await db
    .select({
      total: sql<number>`count(${tables.billing.id}) as total`,
    })
    .from(tables.billing)

  // ✅ Final response
  const result = {
    data: billings,
    pagination: {
      page: currentPage,
      perPage: limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }

  return result
})
