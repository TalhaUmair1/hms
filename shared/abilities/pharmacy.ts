import { defineAbility } from 'nuxt-authorization/utils'
import { id } from 'zod/locales'
/**
 * Doctor abilities
 * - Admin: can create, read, update, delete any doctor
 * - Doctor: can read all doctors, update only their own profile
 * - Patient: no access
 */
export const canCreatePharmacy = defineAbility((user: any) => {
  if (!user) return false
  return user.role === 'admin'
})

export const canReadPharmacy = defineAbility((user: any, pharmacy?: any) => {
  if (!user) return false
  //   if (user.role === 'admin') return true
  //   if (user.role === 'doctor') return true
  //   if (user.id === pharmacy.id) return true // can read all Patientss (like directory)
  return true
})

export const canUpdatePatients = defineAbility((user: any, patient?: any) => {
  if (!user) return false

  if (user.role === 'admin') return true

  return false
})

export const canDeletePatients = defineAbility((user: any, patient?: any) => {
  if (!user) return false
  return user.role === 'admin'
})
