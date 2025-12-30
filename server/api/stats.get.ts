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
  // Helper to calculate variation by comparing current period with previous period
  const getVariation = async (tableName: 'users' | 'billing' | 'pharmacy', valueField: string = '') => {
    const periodDuration = endDate.getTime() - startDate.getTime();
    const previousStartDate = new Date(startDate.getTime() - periodDuration);
    const previousEndDate = startDate;

    let currentValue = 0;
    let previousValue = 0;

    if (tableName === 'users') {
      // Count users in current period
      const currentResult = await db.select({ value: sql`count(*) as value`.mapWith(Number) })
        .from(users)
        .where(and(
          eq(users.role, valueField as 'admin' | 'manager' | 'doctor' | 'patient'), // role is passed as valueField for users
          gte(users.created_at, startDate.toISOString()),
          lte(users.created_at, endDate.toISOString())
        ));
      currentValue = currentResult[0]?.value || 0;

      // Count users in previous period
      const previousResult = await db.select({ value: sql`count(*) as value`.mapWith(Number) })
        .from(users)
        .where(and(
          eq(users.role, valueField as 'admin' | 'manager' | 'doctor' | 'patient'),
          gte(users.created_at, previousStartDate.toISOString()),
          lte(users.created_at, previousEndDate.toISOString())
        ));
      previousValue = previousResult[0]?.value || 0;
    } else if (tableName === 'billing' && valueField === 'amount') {
      // Sum billing amounts in current period
      const currentResult = await db.select({ value: sql<number>`sum(${billing.amount}) as value`.mapWith(Number) })
        .from(billing)
        .where(and(
          gte(billing.created_at, startDate.toISOString()),
          lte(billing.created_at, endDate.toISOString())
        ));
      currentValue = currentResult[0]?.value || 0;

      // Sum billing amounts in previous period
      const previousResult = await db.select({ value: sql<number>`sum(${billing.amount}) as value`.mapWith(Number) })
        .from(billing)
        .where(and(
          gte(billing.created_at, previousStartDate.toISOString()),
          lte(billing.created_at, previousEndDate.toISOString())
        ));
      previousValue = previousResult[0]?.value || 0;
    } else if (tableName === 'pharmacy') {
      // Count pharmacy items in current period
      const currentResult = await db.select({ value: sql`count(*) as value`.mapWith(Number) })
        .from(pharmacy)
        .where(and(
          gte(pharmacy.created_at, startDate.toISOString()),
          lte(pharmacy.created_at, endDate.toISOString())
        ));
      currentValue = currentResult[0]?.value || 0;

      // Count pharmacy items in previous period
      const previousResult = await db.select({ value: sql`count(*) as value`.mapWith(Number) })
        .from(pharmacy)
        .where(and(
          gte(pharmacy.created_at, previousStartDate.toISOString()),
          lte(pharmacy.created_at, previousEndDate.toISOString())
        ));
      previousValue = previousResult[0]?.value || 0;
    }

    // Calculate percentage change
    if (previousValue === 0) {
      return currentValue > 0 ? 100 : 0; // If previous is 0 and current > 0, return 100% (or 0 if both are 0)
    }
    
    const variation = ((currentValue - previousValue) / previousValue) * 100;
    return Math.round(variation);
  }

  const [patientsVariation, doctorsVariation, billVariation, medicinesVariation] = await Promise.all([
    getVariation('users', 'patient'),
    getVariation('users', 'doctor'),
    getVariation('billing', 'amount'),
    getVariation('pharmacy', '')
  ]);

  return {
    patients: {
      value: patientsRes[0]?.value || 0,
      variation: patientsVariation
    },
    doctors: {
      value: doctorsRes[0]?.value || 0,
      variation: doctorsVariation
    },
    bill: {
      value: billRes[0]?.value || 0,
      variation: billVariation
    },
    medicines: {
      value: medicinesRes[0]?.value || 0,
      variation: medicinesVariation
    }
  }
})