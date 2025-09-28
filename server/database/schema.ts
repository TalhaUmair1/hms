import { sql } from 'drizzle-orm/sql'
import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  role: text('role', { enum: ['admin', 'user', 'manager'] }).notNull(),
  phone: text('phone'),
  address: text('address'),
  created_at: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updated_at: text('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})

export const doctors = sqliteTable('doctors', {
  id: integer('id').primaryKey(),
  user_id: integer('user_id'),
  specialization: text('specialization'),
  fees: real('fees'),
  availability: text('availability'),
})

export const patients = sqliteTable('patients', {
  id: integer('id').primaryKey(),
  user_id: integer('user_id'),
  dob: integer('dob'),
  gender: text('gender'),
  medical_history: text('medical_history'),
})
