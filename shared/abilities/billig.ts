import { defineAbility } from 'nuxt-authorization/utils'
/**
 * Doctor abilities
 * - Admin: can create, read, update, delete any doctor
 * - Doctor: can read all doctors, update only their own profile
 * - Patient: no access
 */
export const canCreateBilling = defineAbility((user: any) => {
  if (!user) return false
  return user.role === 'admin'
})

export const canReadBilling = defineAbility((user: any, Billing?: any) => {
  if (!user) return false
  if (user.role === 'admin') return true
  if (user.role === 'patient') return true // can read all Billings (like directory)
  return false
})

export const canUpdateBilling = defineAbility((user: any, Billing?: any) => {
  if (!user) return false

  if (user.role === 'admin') return true

  return false
})

export const canDeleteBilling = defineAbility((user: any) => {
  if (!user) return false
  return user.role === 'admin'
})
