import { zh } from 'h3-zod'
import { eq } from 'drizzle-orm'
import { canReadPatients } from '~~/shared/abilities/patients'

export default eventHandler(async (event) => {
  const db = useDatabase()

  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })
  await authorize(event, canReadPatients)
  const patient = await db
    .select()
    .from(tables.patients)
    .where(eq(tables.patients.id, id))
    .get()

  return patient
})
