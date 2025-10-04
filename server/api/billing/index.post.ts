import { zh, z } from 'h3-zod'
import { id } from 'zod/locales'
import { canCreateBilling } from '~~/shared/abilities/billig'

export default eventHandler(async (event) => {
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
  const { id, appointment_id, patient_id, amount, status, payment_method } =
    body

  await authorize(event, canCreateBilling)

  const billing = await useDatabase()
    .insert(tables.billing)
    .values({
      id,
      appointment_id,
      patient_id,
      amount,
      status,
      payment_method,
    })
    .returning()
    .get()

  return billing
})
