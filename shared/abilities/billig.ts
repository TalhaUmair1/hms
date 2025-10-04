import { defineAbility } from 'nuxt-authorization/utils'
/**
 * Doctor abilities
 * - Admin: can create, read, update, delete any doctor
 * - Doctor: can read all doctors, update only their own profile
 * - Patient: no access
 */
export const canCreateBillin = defineAbility((user: any) => {
  if (!user) return false
  return user.role === 'admin'
})

export const canReadBillin = defineAbility((user: any, Billin?: any) => {
  if (!user) return false
  if (user.role === 'admin') return true
  if (user.role === 'Billin') return true // can read all Billins (like directory)
  return false
})

export const canUpdateBillin = defineAbility((user: any, Billin?: any) => {
  if (!user) return false

  if (user.role === 'admin') return true

  return false
})

export const canDeleteBillin = defineAbility((user: any) => {
  if (!user) return false
  return user.role === 'admin'
})
