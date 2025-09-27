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

export const useDb = () => drizzleDb

export const tables = schema

// export type Todo = typeof tables.todos.$inferSelect
