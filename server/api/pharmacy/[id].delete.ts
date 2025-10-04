import { zh } from 'h3-zod'
import { eq } from 'drizzle-orm'
import { canDeletePharmacy } from '~~/shared/abilities/pharmacy'

export default eventHandler(async (event) => {
  const db = useDatabase()

  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })

  await authorize(event, canDeletePharmacy)
  const medicine = await db
    .delete(tables.pharmacy)
    .where(eq(tables.pharmacy.id, id))

  return medicine
})
