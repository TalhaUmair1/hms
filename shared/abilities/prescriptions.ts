import { defineAbility } from 'nuxt-authorization/utils'

/**
 * PRESCRIPTION ABILITIES
 *
 * Roles:
 * - admin   → full access
 * - doctor  → create, read all, update
 * - patient → read ONLY own prescriptions
 */

/**
 * CREATE
 * Admin, Doctor
 */
export const canCreatePrescription = defineAbility((user: any) => {
  if (!user) return false
  return user.role === 'admin' || user.role === 'doctor'
})

/**
 * READ ALL (directory / list)
 * Admin, Doctor
 */
export const canReadPrescription = defineAbility((user: any) => {
  if (!user) return false
  return user.role === 'admin' || user.role === 'doctor'
})


export const canReadOwnPrescription = defineAbility(
  (user: any, prescription: any) => {
    if (!user) return false

    if (user.role === 'admin') return true
    if (user.role === 'doctor') return true
    if (user.role === 'patient') return true

    // if (user.role === 'patient') {
    //   return prescription.patientId === user.id
    // }

    return false
  }
)

/**
 * UPDATE
 * Admin, Doctor
 */
export const canUpdatePrescription = defineAbility(
  (user: any) => {
    if (!user) return false
    return user.role === 'admin' || user.role === 'doctor'
  }
)

/**
 * DELETE
 * Admin only
 */
export const canDeletePrescription = defineAbility((user: any) => {
  if (!user) return false
  return user.role === 'admin'
})
