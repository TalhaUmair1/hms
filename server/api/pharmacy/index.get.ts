export default eventHandler(async (event) => {
  const medicines = await useDatabase().select().from(tables.pharmacy).all()
  return medicines
})
