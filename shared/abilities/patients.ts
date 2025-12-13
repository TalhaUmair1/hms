import { defineAbility } from 'nuxt-authorization/utils'
import { id } from 'zod/locales'
/**
 * Doctor abilities
 * - Admin: can create, read, update, delete any doctor
 * - Doctor: can read all doctors, update only their own profile
 * - Patient: no access
 */
export const canCreatePatients = defineAbility((user: any) => {
  if (!user) return false
  return user.role === 'admin'
})

export const canReadPatients = defineAbility((user: any, patient?: any) => {
  if (!user) return false
  console.log(user, user.role === 'doctor')
  if (user.role === 'admin') return true
  if (user.role === 'doctor') return true
  if (user.id === patient?.id) return true // can read all Patientss (like directory)
  return false
})

export const canUpdatePatients = defineAbility((user: any, patient?: any) => {
  if (!user) return false

  if (user.role === 'admin') return true
  if (user.role === 'patient' && patient) {
    return user.id === patient.id // only update own profile
  }
  return false
})

export const canDeletePatients = defineAbility((user: any, patient?: any) => {
  if (!user) return false
  if (user.role === 'patient' && patient) {
    return user.id === patient.id // only update own profile
  }
  return user.role === 'admin'
})
