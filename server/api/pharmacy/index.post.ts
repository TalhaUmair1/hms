import { zh, z } from 'h3-zod'
import { canCreatePharmacy } from '~~/shared/abilities/pharmacy'

export default eventHandler(async (event) => {
  const body = await zh.useValidatedBody(
    event,
    z.object({
      id: z.number().optional(),
      name: z.string().min(1),
      quantity: z.number().min(0),
      price: z.number().min(0),
      expiryDate: z.string(),
    })
  )
  const { id, name, quantity, price, expiryDate } = body
  await authorize(event, canCreatePharmacy)

  const medicine = await useDatabase()
    .insert(tables.pharmacy)
    .values({
      id,
      name,
      quantity,
      price,
      expiryDate,
    })
    .returning()
    .get()

  return medicine
})
