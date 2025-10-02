import { zh } from 'h3-zod'
import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const db = useDatabase()

  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })

  const medicine = await db
    .delete(tables.pharmacy)
    .where(eq(tables.pharmacy.id, id))

  return medicine
})
