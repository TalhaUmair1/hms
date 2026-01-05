import { eq, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import { canReadPrescription } from '~~/shared/abilities/prescriptions'

export default eventHandler(async (event) => {
  await authorize(event, canReadPrescription)

  const db = useDatabase()

  // ✅ Pagination defaults
  const { page = '1', perPage = '10' } = getQuery(event)
  const currentPage = Number(page)
  const limit = Number(perPage)
  const offset = (currentPage - 1) * limit

  // ✅ Aliases for user table
  const doctorUser = alias(tables.users, 'doctor_user')
  const patientUser = alias(tables.users, 'patient_user')

  // ✅ Base query
  const baseQuery = db
    .select({
      id: tables.prescriptions.id,
      appointment_id: tables.prescriptions.appointment_id,
      doctor_id: tables.prescriptions.doctor_id,
      patient_id: tables.prescriptions.patient_id,
      medicine_list: tables.prescriptions.medicine_list,
      notes: tables.prescriptions.notes,
      date: tables.appointments.date,
      status: tables.appointments.status,
      patient_name: sql<string>`patient_user.name as patient_name`,
      doctor_name: sql<string>`doctor_user.name as doctor_name`,
    })
    .from(tables.prescriptions)
    .leftJoin(
      tables.doctors,
      eq(tables.prescriptions.doctor_id, tables.doctors.id)
    )
    .leftJoin(doctorUser, eq(tables.doctors.user_id, doctorUser.id))
    .leftJoin(
      tables.patients,
      eq(tables.prescriptions.patient_id, tables.patients.id)
    )
    .leftJoin(patientUser, eq(tables.patients.user_id, patientUser.id))
    .leftJoin(
      tables.appointments,
      eq(tables.prescriptions.appointment_id, tables.appointments.id)
    )

  // ✅ Get paginated data
  const prescriptions = await baseQuery
    .limit(limit)
    .offset(offset)
    .all()

  // ✅ Total records count
  const [{ total }] = await db
    .select({
      total: sql<number>`count(${tables.prescriptions.id}) as total`,
    })
    .from(tables.prescriptions)

  // ✅ Final response
  const result = {
    data: prescriptions,
    pagination: {
      page: currentPage,
      perPage: limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }

  return result
})
