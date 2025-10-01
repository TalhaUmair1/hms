import { zh } from 'h3-zod'
import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const db = useDatabase()

  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })
  const preception = await db
    .select()
    .from(tables.prescriptions)
    .where(eq(tables.prescriptions.id, id))
    .get()

  return preception
})
