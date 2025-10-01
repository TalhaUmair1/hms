export default eventHandler(async (event) => {
  const prescriptions = await useDatabase()
    .select()
    .from(tables.prescriptions)
    .all()

  return prescriptions
})
