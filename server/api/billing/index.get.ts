export default eventHandler(async (event) => {
  const billings = await useDatabase().select().from(tables.billing).all()
  return billings
})
