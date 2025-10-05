import { defineAbility } from 'nuxt-authorization/utils'
/**
 * Doctor abilities
 * - Admin: can create, read, update, delete any doctor
 * - Doctor: can read all doctors, update only their own profile
 * - Patient: no access
 */

export const canUpdateUser = defineAbility((user: any, updatedUser?: any) => {
  if (!user) return false

  if (user.role === 'admin') return true
  if (updatedUser) {
    return user.id === updatedUser.id // only update own profile
  }
  return false
})

export const canDeleteUser = defineAbility((user: any) => {
  if (!user) return false
  return user.role === 'admin'
})
