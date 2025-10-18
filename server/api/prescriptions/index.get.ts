import { canReadPrescription } from '~~/shared/abilities/prescriptions'

export default eventHandler(async (event) => {
  await authorize(event, canReadPrescription)
  const prescriptions = await useDatabase()
    .select()
    .from(tables.prescriptions)
    .all()

  return prescriptions
})
