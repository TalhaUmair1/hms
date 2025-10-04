import { defineAbility } from 'nuxt-authorization/utils'
/**
 * Doctor abilities
 * - Admin: can create, read, update, delete any doctor
 * - Doctor: can read all doctors, update only their own profile
 * - Patient: no access
 */
export const canCreateappointments = defineAbility((user: any) => {
  if (!user) return false
  return user.role === 'admin'
})

export const canReadappointments = defineAbility(
  (user: any, appointments?: any) => {
    if (!user) return false
    if (user.role === 'admin') return true
    if (user.role === 'doctor') return true
    if (user.role === 'appointments') return true // can read all appointmentss (like directory)
    return false
  }
)

export const canUpdateappointments = defineAbility(
  (user: any, appointments?: any) => {
    if (!user) return false

    if (user.role === 'admin') return true
    if (user.role === 'doctor') return true
    if (user.role === 'appointments' && appointments) {
      return user.id === appointments.id // only update own profile
    }
    return false
  }
)

export const canDeleteappointments = defineAbility((user: any) => {
  if (!user) return false
  return user.role === 'admin'
})
