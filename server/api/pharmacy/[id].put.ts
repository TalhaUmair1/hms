import { z, zh } from 'h3-zod'
import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const db = useDatabase()

  const notFoundError = createError({
    statusCode: 404,
    message: 'Medicine is not found',
  })

  const { id: paramId } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })
  const body = await zh.useValidatedBody(
    event,
    z.object({
      id: z.number().int().optional(),
      price: z.number().min(0).optional(),
      quantity: z.number().min(0).optional(),
      name: z.string().min(1).max(255).optional(),
      expiryDate: z.string().optional(),
    })
  )
  const { id, price, quantity, name, expiryDate } = body
  const existingMedicine = await db
    .select()
    .from(tables.pharmacy)
    .where(eq(tables.pharmacy.id, paramId))
    .get()
  if (!existingMedicine) {
    throw notFoundError
  }
  const updatedMedicine = await db
    .update(tables.pharmacy)
    .set({
      id: id ?? existingMedicine.id,
      price: price ?? existingMedicine.price,
      quantity: quantity ?? existingMedicine.quantity,
      name: name ?? existingMedicine.name,
      expiryDate: expiryDate ?? existingMedicine.expiryDate,
    })
    .where(eq(tables.pharmacy.id, paramId))
    .returning()
    .get()
  return updatedMedicine
})
