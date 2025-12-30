import { count, eq, sql, and, gte, lte } from 'drizzle-orm'
import { users, billing, pharmacy } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const { period, range } = getQuery(event)

  const startDate = (range as any)?.start ? new Date((range as any).start as string) : new Date(new Date().setDate(new Date().getDate() - 30))
  const endDate = (range as any)?.end ? new Date((range as any).end as string) : new Date()

    const db = useDatabase()
  // Fetch data in parallel
  const [patientsRes, doctorsRes, billRes, medicinesRes] = await Promise.all([
    // Count patients
    db.select({ value: sql`count(*) as value`.mapWith(Number) })
      .from(users)
      .where(and(
        eq(users.role, 'patient'),
        gte(users.created_at, startDate.toISOString()),
        lte(users.created_at, endDate.toISOString())
      )),

    // Count doctors
    db.select({ value: sql`count(*) as value`.mapWith(Number) })
      .from(users)
      .where(and(
        eq(users.role, 'doctor'),
        gte(users.created_at, startDate.toISOString()),
        lte(users.created_at, endDate.toISOString())
      )),

    // Sum bill amounts
    db.select({ value: sql<number>`sum(${billing.amount}) as value`.mapWith(Number) })
      .from(billing)
      .where(and(
        gte(billing.created_at, startDate.toISOString()),
        lte(billing.created_at, endDate.toISOString())
      )),

    // Count medicines
    db.select({ value: sql`count(*) as value`.mapWith(Number) })
      .from(pharmacy)
      .where(and(
        gte(pharmacy.created_at, startDate.toISOString()),
        lte(pharmacy.created_at, endDate.toISOString())
      ))
  ])
 console.log({ patientsRes, doctorsRes, billRes, medicinesRes })
  // Helper to calculate variation (mocked for now as it requires historical data queries)
  const getVariation = () => Math.floor(Math.random() * (25 - -15 + 1)) + -15

  return {
    patients: {
      value: patientsRes[0]?.value || 0,
      variation: getVariation()
    },
    doctors: {
      value: doctorsRes[0]?.value || 0,
      variation: getVariation()
    },
    bill: {
      value: billRes[0]?.value || 0,
      variation: getVariation()
    },
    medicines: {
      value: medicinesRes[0]?.value || 0,
      variation: getVariation()
    }
  }
})