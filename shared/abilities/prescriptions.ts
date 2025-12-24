import { defineAbility } from 'nuxt-authorization/utils'
/**
 * Doctor abilities
 * - Admin: can create, read, update, delete any doctor
 * - Doctor: can read all doctors, update only their own profile
 * - Patient: no access
 */
export const canCreatePrescription = defineAbility((user: any) => {
  if (!user) return false
  return user.role === 'admin'
})

export const canReadPrescription = defineAbility(
  (user: any, prescription?: any) => {
    if (!user) return false
    if (user.role === 'admin') return true
    if  (user.role === 'doctor') return true
    // can read all prescriptions (like directory)
    return false
  }
)

export const canReadOwnPrescription = defineAbility(
  (user: any, prescription: any) => {
    if (!user) return false 
    if (user.role === 'admin') return true
    if (user.role === 'patient' )return true
    return false
  }
)




export const canUpdatePrescription = defineAbility(
  (user: any, prescription?: any) => {
    if (!user) return false

    if (user.role === 'admin') return true

    return false
  }
)

export const canDeletePrescription = defineAbility((user: any) => {
  if (!user) return false
  return user.role === 'admin'
})
