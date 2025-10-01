export default eventHandler(async (event) => {
  const patients = await useDatabase().select().from(tables.patients).all()

  return patients
})
