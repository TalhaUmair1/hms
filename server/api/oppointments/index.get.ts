import { canReadappointments } from '~~/shared/abilities/appointments'

export default eventHandler(async (event) => {
  await authorize(event, canReadappointments)
  const appointments = await useDatabase()
    .select()
    .from(tables.appointments)
    .all()

  return appointments
})
