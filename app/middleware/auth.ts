// middleware/auth.ts
export default defineNuxtRouteMiddleware(() => {
  const { user } = useUserSession()
  console.log('middleware user', user.value)

  if (!user.value) {
    return navigateTo('/login')
  }
})
