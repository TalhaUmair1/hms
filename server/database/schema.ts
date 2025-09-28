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
  dob: text('dob'),
  gender: text('gender'),
  medical_history: text('medical_history'),
})

export const appointments = sqliteTable('appointments', {
  id: integer('id').primaryKey(),
  patient_id: integer('patient_id'),
  doctor_id: integer('doctor_id'),
  date: text('date').notNull(),
  status: text('status', {
    enum: ['pending', 'confirmed', 'completed', 'canceled'],
  }).default('pending'),
})

export const prescriptions = sqliteTable('prescriptions', {
  id: integer('id').primaryKey(),
  appointment_id: integer('appointment_id'),
  doctor_id: integer('doctor_id'),
  patient_id: integer('patient_id'),
  medicine_list: text('medicine_list'),
  notes: text('notes'),
})

export const billing = sqliteTable('billing', {
  id: integer('id').primaryKey(),
  appointment_id: integer('appointment_id'),
  patient_id: integer('patient_id'),
  amount: real('amount'),
  status: text('status'),
  payment_method: text('payment_method'),
})

export const pharmacy = sqliteTable('pharmacy', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  quantity: integer('quantity').notNull(),
  price: integer('price').notNull(),
  expiryDate: text('expiry_date'), // ISO date string
})
