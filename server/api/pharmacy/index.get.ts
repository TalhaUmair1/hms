import { canReadPharmacy } from '~~/shared/abilities/pharmacy'
import { sql } from 'drizzle-orm'

export default eventHandler(async (event) => {
  // ✅ Authorization
  await authorize(event, canReadPharmacy)

  const db = useDatabase()

  // ✅ Pagination defaults
  const { page = '1', perPage = '10' } = getQuery(event)
  const currentPage = Number(page)
  const limit = Number(perPage)
  const offset = (currentPage - 1) * limit

  // ✅ Base query for pharmacy items
  const baseQuery = db
    .select({
      id: tables.pharmacy.id,
      name: tables.pharmacy.name,
      quantity: tables.pharmacy.quantity,
      price: tables.pharmacy.price,
      expiryDate: tables.pharmacy.expiryDate,
    })
    .from(tables.pharmacy)

  // ✅ Fetch paginated data
  const medicines = await baseQuery
    .limit(limit)
    .offset(offset)
    .all()

  // ✅ Total number of records
  const [{ total }] = await db
    .select({
      total: sql<number>`count(${tables.pharmacy.id}) as total`,
    })
    .from(tables.pharmacy)

  // ✅ Final response with pagination info
  return {
    data: medicines,
    pagination: {
      page: currentPage,
      perPage: limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
})
