import { eq } from 'drizzle-orm'
import { zh } from 'h3-zod'
import { canDeletePrescription } from '~~/shared/abilities/prescriptions'

export default eventHandler(async (event) => {
  const db = await useDatabase()

  const error = createError({
    statusCode: 404,

    message: 'Prescription not found',
  })

  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })

  await authorize(event, canDeletePrescription)
  const prescription = await db
    .delete(tables.prescriptions)
    .where(eq(tables.prescriptions.id, id))
    .returning()

  if (prescription.length === 0) {
    throw error
  }

  return prescription[0]
})
