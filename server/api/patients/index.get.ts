import { canReadPatients } from './../../../shared/abilities/patients'

export default eventHandler(async (event) => {
  await authorize(event, canReadPatients)
  const patients = await useDatabase().select().from(tables.patients).all()

  return patients
})
