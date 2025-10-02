import { defineAbility } from 'nuxt-authorization/utils'
/**
 * Doctor abilities
 * - Admin: can create, read, update, delete any doctor
 * - Doctor: can read all doctors, update only their own profile
 * - Patient: no access
 */
export const canCreateDoctor = defineAbility((user: any) => {
  if (!user) return false
  return user.role === 'admin'
})

export const canReadDoctor = defineAbility((user: any, doctor?: any) => {
  if (!user) return false
  if (user.role === 'admin') return true
  if (user.role === 'doctor') return true // can read all doctors (like directory)
  return false
})

export const canUpdateDoctor = defineAbility((user: any, doctor?: any) => {
  if (!user) return false

  if (user.role === 'admin') return true
  if (user.role === 'doctor' && doctor) {
    return user.id === doctor.id // only update own profile
  }
  return false
})

export const canDeleteDoctor = defineAbility((user: any) => {
  if (!user) return false
  return user.role === 'admin'
})
