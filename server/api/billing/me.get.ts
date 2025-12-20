import { eq, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import { canReadPersonalBilling } from '~~/shared/abilities/billing'

export default eventHandler(async (event) => {
  const db = useDatabase()

  const { user: currentUser } = await requireUserSession(event) as any
  const userId = Number(currentUser.id)

  // ✅ Authorization
  await authorize(event, canReadPersonalBilling, currentUser)

  // ✅ Alias users table
  const patientUser = alias(tables.users, 'patient_user')

  const billings = await db
    .select({
      id: tables.billing.id,
      appointment_id: tables.billing.appointment_id,
      patient_id: tables.billing.patient_id,
      amount: tables.billing.amount,
      status: tables.billing.status,
      payment_method: tables.billing.payment_method,
      patient_name:sql<string>`patient_user.name as patient_name`,
      date: tables.appointments.date,
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
    .where(eq(tables.patients.user_id, userId))
console.log(billings,'getting from billings');

  return billings
})
