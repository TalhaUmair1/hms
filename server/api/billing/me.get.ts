import { eq } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import { canReadPersonalBilling } from '~~/shared/abilities/billing'

export default eventHandler(async (event) => {
  const db = useDatabase()

  const { user: currentUser } = await requireUserSession(event) as any
  const userId = Number(currentUser.id)

  // 🔐 Authorization
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

  console.log(billings, 'PERSONAL BILLINGS')

  return billings
})
