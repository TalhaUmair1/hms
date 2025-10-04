import { z, zh } from 'h3-zod'
import { eq } from 'drizzle-orm'

import { canUpdatePatients } from './../../../shared/abilities/patients'

export default eventHandler(async (event) => {
  const db = useDatabase()

  const notFoundError = createError({
    statusCode: 404,
    message: 'Patient not found',
  })

  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })
  const body = await zh.useValidatedBody(
    event,
    z.object({
      dob: z.string().optional(),
      gender: z.string().optional(),
      medical_history: z.string().optional(),
    })
  )
  const { dob, gender, medical_history } = body
  const existingPatient = await db
    .select()
    .from(tables.patients)
    .where(eq(tables.patients.id, id))
    .get()
  if (!existingPatient) {
    throw notFoundError
  }
  await authorize(event, canUpdatePatients, existingPatient)
  const updatedPatient = await db
    .update(tables.patients)
    .set({
      dob: dob ?? existingPatient.dob,
      gender: gender ?? existingPatient.gender,
      medical_history: medical_history ?? existingPatient.medical_history,
    })
    .where(eq(tables.patients.id, id))
    .returning()
    .get()
  return updatedPatient
})
