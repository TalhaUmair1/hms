import { zh } from 'h3-zod'
import { eq } from 'drizzle-orm'
import { canReadpresception } from '~~/shared/abilities/prescriptions'

export default eventHandler(async (event) => {
  const db = useDatabase()

  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })
  await authorize(event, canReadpresception)
  const preception = await db
    .select()
    .from(tables.prescriptions)
    .where(eq(tables.prescriptions.id, id))
    .get()

  return preception
})
