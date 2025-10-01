import { zh } from 'h3-zod'
import { eq } from 'drizzle-orm'
import { billing } from './../../database/schema'

export default eventHandler(async (event) => {
  const db = useDatabase()

  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })

  const bill = await db.delete(tables.billing).where(eq(tables.billing.id, id))

  return bill
})
