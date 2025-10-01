import { zh, z } from 'h3-zod'
import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const db = useDatabase()

  const notFoundError = createError({
    statusCode: 404,
    message: 'Prescription not found',
  })

  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })

  // Validate request body
  const body = await zh.useValidatedBody(event, {
    appointment_id: z.number().int().optional(),
    doctor_id: z.number().int().optional(),
    patient_id: z.number().int().optional(),
    medicine_list: z.string().optional(),
    notes: z.string().optional(),
  })

  // Check if prescription exists
  const existingPrescription = await db
    .select()
    .from(tables.prescriptions)
    .where(eq(tables.prescriptions.id, id))
    .get()

  if (!existingPrescription) {
    throw notFoundError
  }

  // Update prescription
  const updatedPrescription = await db
    .update(tables.prescriptions)
    .set({
      appointment_id:
        body.appointment_id ?? existingPrescription.appointment_id,
      doctor_id: body.doctor_id ?? existingPrescription.doctor_id,
      patient_id: body.patient_id ?? existingPrescription.patient_id,
      medicine_list: body.medicine_list ?? existingPrescription.medicine_list,
      notes: body.notes ?? existingPrescription.notes,
    })
    .where(eq(tables.prescriptions.id, id))
    .returning()
    .get()

  return updatedPrescription
})
