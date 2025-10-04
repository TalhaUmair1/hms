import { defineAbility } from 'nuxt-authorization/utils'
/**
 * Doctor abilities
 * - Admin: can create, read, update, delete any doctor
 * - Doctor: can read all doctors, update only their own profile
 * - Patient: no access
 */
export const canCreatepresception = defineAbility((user: any) => {
  if (!user) return false
  return user.role === 'admin'
})

export const canReadpresception = defineAbility(
  (user: any, presception?: any) => {
    if (!user) return false
    if (user.role === 'admin') return true
    // can read all presceptions (like directory)
    return false
  }
)

export const canUpdatepresception = defineAbility(
  (user: any, presception?: any) => {
    if (!user) return false

    if (user.role === 'admin') return true

    return false
  }
)

export const canDeletepresception = defineAbility((user: any) => {
  if (!user) return false
  return user.role === 'admin'
})
