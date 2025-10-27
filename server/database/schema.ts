import { sql } from 'drizzle-orm/sql'
import {
  sqliteTable,
  integer,
  text,
  real,
  primaryKey,
  unique,
  foreignKey,
} from 'drizzle-orm/sqlite-core'

// =========================
// USERS
// =========================
export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role', {
    enum: ['admin', 'manager', 'doctor', 'patient'],
  }).notNull(),
  phone: text('phone'),
  address: text('address'),
  created_at: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updated_at: text('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})

// =========================
// CREDENTIALS
// =========================
export const credentials = sqliteTable(
  'credentials',
  {
    userId: integer('userId').notNull(),
    id: text('id').notNull(),
    publicKey: text('publicKey').notNull(),
    counter: integer('counter').notNull(),
    backedUp: integer('backedUp').notNull(),
    transports: text('transports').notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.id] }),
    unique('credentials_id_unique').on(table.id),
    foreignKey(() => ({
      columns: [table.userId],
      foreignColumns: [users.id],
    }))
      .onDelete('cascade')
      .onUpdate('cascade'),
  ]
)

// =========================
// DOCTORS
// =========================
export const doctors = sqliteTable(
  'doctors',
  {
    id: integer('id').primaryKey(),
    user_id: integer('user_id').notNull(),
    specialization: text('specialization'),
    fees: real('fees'),
    availability: text('availability'),
  },
  (table) => [
    foreignKey(() => ({
      columns: [table.user_id],
      foreignColumns: [users.id],
    }))
      .onDelete('cascade')
      .onUpdate('cascade'),
  ]
)

// =========================
// PATIENTS
// =========================
export const patients = sqliteTable(
  'patients',
  {
    id: integer('id').primaryKey(),
    user_id: integer('user_id').notNull(),
    dob: text('dob'),
    gender: text('gender'),
    medical_history: text('medical_history'),
  },
  (table) => [
    foreignKey(() => ({
      columns: [table.user_id],
      foreignColumns: [users.id],
    }))
      .onDelete('cascade')
      .onUpdate('cascade'),
  ]
)

// =========================
// APPOINTMENTS
// =========================
export const appointments = sqliteTable(
  'appointments',
  {
    id: integer('id').primaryKey(),
    patient_id: integer('patient_id').notNull(),
    doctor_id: integer('doctor_id').notNull(),
    date: text('date').notNull(),
    status: text('status', {
      enum: ['pending', 'confirmed', 'completed', 'canceled'],
    }).notNull(),
  },
  (table) => [
    foreignKey(() => ({
      columns: [table.patient_id],
      foreignColumns: [patients.id],
    }))
      .onDelete('cascade')
      .onUpdate('cascade'),
    foreignKey(() => ({
      columns: [table.doctor_id],
      foreignColumns: [doctors.id],
    }))
      .onDelete('cascade')
      .onUpdate('cascade'),
  ]
)

// =========================
// PRESCRIPTIONS
// =========================
export const prescriptions = sqliteTable(
  'prescriptions',
  {
    id: integer('id').primaryKey(),
    appointment_id: integer('appointment_id').notNull(),
    doctor_id: integer('doctor_id').notNull(),
    patient_id: integer('patient_id').notNull(),
    medicine_list: text('medicine_list'),
    notes: text('notes'),
  },
  (table) => [
    foreignKey(() => ({
      columns: [table.appointment_id],
      foreignColumns: [appointments.id],
    }))
      .onDelete('cascade')
      .onUpdate('cascade'),
    foreignKey(() => ({
      columns: [table.doctor_id],
      foreignColumns: [doctors.id],
    }))
      .onDelete('cascade')
      .onUpdate('cascade'),
    foreignKey(() => ({
      columns: [table.patient_id],
      foreignColumns: [patients.id],
    }))
      .onDelete('cascade')
      .onUpdate('cascade'),
  ]
)

// =========================
// BILLING
// =========================
export const billing = sqliteTable(
  'billing',
  {
    id: integer('id').primaryKey(),
    appointment_id: integer('appointment_id').notNull(),
    patient_id: integer('patient_id').notNull(),
    amount: real('amount').notNull(),
    status: text('status'),
    payment_method: text('payment_method'),
  },
  (table) => [
    foreignKey(() => ({
      columns: [table.appointment_id],
      foreignColumns: [appointments.id],
    }))
      .onDelete('cascade')
      .onUpdate('cascade'),
    foreignKey(() => ({
      columns: [table.patient_id],
      foreignColumns: [patients.id],
    }))
      .onDelete('cascade')
      .onUpdate('cascade'),
  ]
)

// =========================
// PHARMACY
// =========================
export const pharmacy = sqliteTable('pharmacy', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  quantity: integer('quantity').notNull(),
  price: integer('price').notNull(),
  expiryDate: text('expiry_date').notNull(), // ISO date string
})
