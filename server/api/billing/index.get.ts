import { eq, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import { canReadBilling } from '~~/shared/abilities/billig'

export default eventHandler(async (event) => {
  await authorize(event, canReadBilling)
  const db = useDatabase()

  // alias for patient user
  const patientUser = alias(tables.users, 'patient_user')

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
    .leftJoin(patientUser, eq(tables.patients.user_id, patientUser.id))
    .leftJoin(
      tables.appointments,
      eq(tables.billing.appointment_id, tables.appointments.id)
    )
    .all()

  return billings
})
