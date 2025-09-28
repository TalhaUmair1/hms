import { createDatabase } from 'db0'
import sqlite from 'db0/connectors/better-sqlite3'
import { drizzle } from 'db0/integrations/drizzle'
import * as schema from '../database/schema'

// Initialize DB instance
// You can use any other available connector
const db = createDatabase(
  sqlite({
    path: process.env.DB_CONNECTION,
  })
)

const drizzleDb = drizzle(db)

export const useDatabase = () => drizzleDb

export const tables = schema

export type User = typeof tables.users.$inferSelect
export type Doctor = typeof tables.doctors.$inferSelect
export type Patient = typeof tables.patients.$inferSelect
export type Appointment = typeof tables.appointments.$inferSelect
export type Prescription = typeof tables.prescriptions.$inferSelect
export type Billing = typeof tables.billing.$inferSelect
export type Role = User['role']
export type Pharmacy = typeof tables.pharmacy.$inferSelect
