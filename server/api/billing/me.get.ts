import { eq, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import { canReadPersonalBilling } from '~~/shared/abilities/billing'

export default eventHandler(async (event) => {
  const db = useDatabase()

  const { user: currentUser } = await requireUserSession(event) as any
  const userId = Number(currentUser.id)

  // 🔐 Authorization
  await authorize(event, canReadPersonalBilling, currentUser)

  // ✅ Pagination defaults (SAME STANDARD)
  const { page = '1', perPage = '2' } = getQuery(event)
  const currentPage = Number(page)
  const limit = Number(perPage)
  const offset = (currentPage - 1) * limit

  // ✅ Alias users table
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

      // patient
      patient_name: patientUser.name,

      // appointment
      date: tables.appointments.date,
    })
    .from(tables.billing)
    .innerJoin(
      tables.patients,
      eq(tables.billing.patient_id, tables.patients.id)
    )
    .innerJoin(
      patientUser,
      eq(tables.patients.user_id, patientUser.id)
    )
    .leftJoin(
      tables.appointments,
      eq(tables.billing.appointment_id, tables.appointments.id)
    )
    .where(eq(patientUser.id, userId))

  // ✅ Paginated data
  const billings = await baseQuery
    .limit(limit)
    .offset(offset)
    .all()

  // ✅ Total count (same filter)
  const [{ total }] = await db
    .select({
      total: sql<number>`count(${tables.billing.id}) as total`,
    })
    .from(tables.billing)
    .innerJoin(
      tables.patients,
      eq(tables.billing.patient_id, tables.patients.id)
    )
    .innerJoin(
      patientUser,
      eq(tables.patients.user_id, patientUser.id)
    )
    .where(eq(patientUser.id, userId))

  return {
    data: billings,
    pagination: {
      page: currentPage,
      perPage: limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
})
