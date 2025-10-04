import { canReadpresception } from '~~/shared/abilities/prescriptions'

export default eventHandler(async (event) => {
  await authorize(event, canReadpresception)
  const prescriptions = await useDatabase()
    .select()
    .from(tables.prescriptions)
    .all()

  return prescriptions
})
