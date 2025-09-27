import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  role: text('role').notNull(),
  phone: text('phone'),
  address: text('address'),
  created_at: text('created_at').notNull(),
})
