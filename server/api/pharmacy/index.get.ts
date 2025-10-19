import { canReadPharmacy } from '~~/shared/abilities/pharmacy'

export default eventHandler(async (event) => {
  await authorize(event, canReadPharmacy)
  const medicines = await useDatabase().select().from(tables.pharmacy).all()
  console.log(medicines)

  return medicines
})
