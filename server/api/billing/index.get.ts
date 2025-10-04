import { canReadBilling } from '~~/shared/abilities/billig'

export default eventHandler(async (event) => {
  await authorize(event, canReadBilling)
  const billings = await useDatabase().select().from(tables.billing).all()
  return billings
})
