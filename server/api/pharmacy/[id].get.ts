import { zh } from 'h3-zod'
import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const db = useDatabase()

  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })
  const medicine = await db
    .select()
    .from(tables.pharmacy)
    .where(eq(tables.pharmacy.id, id))
    .get()

  return medicine
})
