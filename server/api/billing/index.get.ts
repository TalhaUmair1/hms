import { eq, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import { canReadPersonalBilling } from '~~/shared/abilities/billing'
import { H3Event, EventHandlerRequest, createError } from 'h3'

export default eventHandler(async (event) => {
  const db = useDatabase()
  const user = requireUser(event)

  await authorize(event, canReadPersonalBilling, user)

  // ✅ Alias for users table
  const patientUser = alias(tables.users, 'patient_user')

  // ✅ Query with joins
  const billings = await db
    .select({
      id: tables.billing.id,
      appointment_id: tables.billing.appointment_id,
      patient_id: tables.billing.patient_id,
      amount: tables.billing.amount,
      status: tables.billing.status,
      date: tables.appointments.date,
      payment_method: tables.billing.payment_method,
      patient_name: sql<string>`patient_user.name as patient_name`,
    })
    .from(tables.billing)
    .leftJoin(
      tables.patients,
      eq(tables.billing.patient_id, tables.patients.id)
    )
    .leftJoin(
      patientUser,
      eq(tables.patients.user_id, patientUser.id)
    )
    .leftJoin(
      tables.appointments,
      eq(tables.billing.appointment_id, tables.appointments.id)
    )
    .where(eq(tables.patients.user_id, user.id))

  return billings
})

function requireUser(event: H3Event<EventHandlerRequest>) {
  const ctx = (event as any).context || {}
  const node = (event as any).node || {}
  const locals = (event as any).locals || {}

  const user =
    ctx.user ||
    ctx.auth?.user ||
    (node.req && (node.req as any).user) ||
    locals.user ||
    ctx.session?.user ||
    ctx.auth?.session?.user

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  return user
}
