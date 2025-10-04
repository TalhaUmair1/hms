import { zh } from 'h3-zod'
import { eq } from 'drizzle-orm'
import { canDeleteBilling } from '~~/shared/abilities/billig'

export default eventHandler(async (event) => {
  const db = useDatabase()

  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })
  await authorize(event, canDeleteBilling)

  const bill = await db.delete(tables.billing).where(eq(tables.billing.id, id))

  return bill
})
