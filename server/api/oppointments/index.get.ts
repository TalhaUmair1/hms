export default eventHandler(async (event) => {
  const appointments = await useDatabase()
    .select()
    .from(tables.appointments)
    .all()

  return appointments
})
