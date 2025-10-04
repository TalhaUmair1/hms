import { zh } from 'h3-zod'
import { eq } from 'drizzle-orm'
import { canDeletePatients } from '../../../shared/abilities/patients'

export default eventHandler(async (event) => {
  const db = useDatabase()

  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })

  await authorize(event, canDeletePatients)

  const patient = await db
    .delete(tables.patients)
    .where(eq(tables.patients.id, id))

  return patient
})
