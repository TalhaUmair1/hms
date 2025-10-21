import { eq, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import { zh } from 'h3-zod'
import { canReadPersonalBilling } from '~~/shared/abilities/billig'

export default eventHandler(async (event) => {
  const db = useDatabase()

  // ✅ Validate and parse `id` from route params
  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })

  await authorize(event, canReadPersonalBilling)

  // ✅ Alias for users table
  const patientUser = alias(tables.users, 'patient_user')

  // ✅ Query with joins
  const billing = await db
    .select({
      id: tables.billing.id,
      appointment_id: tables.billing.appointment_id,
      patient_id: tables.billing.patient_id,
      amount: tables.billing.amount,
      status: tables.billing.status,
      payment_method: tables.billing.payment_method,
      patient_name: sql<string>`patient_user.name as patient_name`,
    })
    .from(tables.billing)
    .leftJoin(
      tables.patients,
      eq(tables.billing.patient_id, tables.patients.id)
    )
    .leftJoin(patientUser, eq(tables.patients.user_id, patientUser.id))
    .where(eq(tables.billing.id, id))
    .get()

  if (!billing) {
    throw createError({
      statusCode: 404,
      message: 'Billing not found',
    })
  }

  return billing
})
