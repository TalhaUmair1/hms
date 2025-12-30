import { count, eq, sql, and, gte, lte } from 'drizzle-orm'
import { billing } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const { period, range } = getQuery(event)
  
  const startDate = (range as any)?.start ? new Date((range as any).start as string) : new Date(new Date().setDate(new Date().getDate() - 30))
  const endDate = (range as any)?.end ? new Date((range as any).end as string) : new Date()

  const db = useDatabase()
  
  // Get daily billing data based on the period
  let groupByClause = ''
  let dateFormat = ''
  
  switch(period as string) {
    case 'daily':
      groupByClause = "strftime('%Y-%m-%d', created_at)"
      dateFormat = "%Y-%m-%d"
      break
    case 'weekly':
      groupByClause = "strftime('%Y-%W', created_at)"  // Year and week number
      dateFormat = "%Y-%W"
      break
    case 'monthly':
      groupByClause = "strftime('%Y-%m', created_at)"  // Year and month
      dateFormat = "%Y-%m"
      break
    default:
      groupByClause = "strftime('%Y-%m-%d', created_at)"
      dateFormat = "%Y-%m-%d"
  }

  const billingData = await db
    .select({
      date: sql<string>`strftime('${dateFormat}', ${billing.created_at})`.as('date'),
      amount: sql<number>`sum(${billing.amount})`.as('amount')
    })
    .from(billing)
    .where(
      and(
        gte(billing.created_at, startDate.toISOString()),
        lte(billing.created_at, endDate.toISOString())
      )
    )
    .groupBy(sql`${groupByClause}`)
    .orderBy(sql`${billing.created_at}`)
  
  // Format the data to match what the chart expects
  // Convert the date string to ISO string format that can be properly parsed by the client
  const formattedData = billingData.map(item => ({
    date: new Date(item.date + 'T00:00:00Z').toISOString(), // Convert to ISO string for proper serialization
    amount: item.amount
  }))

  return formattedData
})