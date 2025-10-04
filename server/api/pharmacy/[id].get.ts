import { zh } from 'h3-zod'
import { eq } from 'drizzle-orm'
import { canReadPharmacy } from './../../../shared/abilities/pharmacy'

export default eventHandler(async (event) => {
  const db = useDatabase()

  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })
  await authorize(event, canReadPharmacy)
  const medicine = await db
    .select()
    .from(tables.pharmacy)
    .where(eq(tables.pharmacy.id, id))
    .get()

  return medicine
})
