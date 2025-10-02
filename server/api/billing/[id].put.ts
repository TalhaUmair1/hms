import { eq } from 'drizzle-orm'
import { zh } from 'h3-zod'
import z from 'zod'

export default eventHandler(async (event) => {
  const db = useDatabase()

  const { id } = await zh.useValidatedParams(event, {
    id: zh.intAsString,
  })

  const body = await zh.useValidatedBody(
    event,
    z.object({
      id: z.number().optional(),
      appointment_id: z.number().optional(),
      patient_id: z.number().optional(),
      amount: z.number().optional(),
      status: z.string().optional(),
      payment_method: z.string().optional(),
    })
  )

  const { appointment_id, patient_id, amount, status, payment_method } = body

  const bill = await db
    .select()
    .from(tables.billing)
    .where(eq(tables.billing.id, id))
    .get()

  if (!bill) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Bill not found',
    })
  }

  const updatedBill = await db
    .update(tables.billing)
    .set({
      id,
      appointment_id,
      patient_id,
      amount,
      status,
      payment_method,
    })
    .where(eq(tables.billing.id, id))
    .returning()
    .get()

  return updatedBill
})
