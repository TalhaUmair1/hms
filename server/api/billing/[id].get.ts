import { eq } from 'drizzle-orm'
import { zh } from 'h3-zod'
import { canReadBilling } from '~~/shared/abilities/billig'

export default eventHandler(async (event) => {
  const db = useDatabase()

  // Validate `id` from params
  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString, // ensures string param gets cast to int
  })

  await authorize(event, canReadBilling)
  // Query billing by id
  const billing = await db
    .select()
    .from(tables.billing)
    .where(eq(tables.billing.id, id))
    .get()

  if (!billing) {
    throw createError({
      statusCode: 404,
      message: 'Billing not found',
    })
  }

  return billing
})
