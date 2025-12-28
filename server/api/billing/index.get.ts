import { eq } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import { H3Event, EventHandlerRequest, createError } from 'h3'

export default eventHandler(async (event) => {
  const db = useDatabase()

  // 🔐 Optional: keep auth if required
  // const user = requireUser(event)

  // ✅ Alias users table for patient
  // const patientUser = alias(tables.users, 'patient_user')

  console.log('Fetching ALL billing records')
const patientUser = alias(tables.users, 'patient_user')
console.log(patientUser, 'patients user from billing index');


const billings = await db
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
  .leftJoin(
    patientUser,
    eq(tables.patients.user_id, patientUser.id)
  )
  .leftJoin(
    tables.appointments,
    eq(tables.billing.appointment_id, tables.appointments.id)
  )



  console.log(billings, 'ALL BILLING DATA')

  return billings
})
