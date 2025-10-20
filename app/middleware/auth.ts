// middleware/auth.ts
export default defineNuxtRouteMiddleware(() => {
  const { user, loggedIn } = useUserSession()
  console.log('middleware ', loggedIn)
  console.log('middleware user', user.value)

  if (!loggedIn.value) {
    return navigateTo('/login')
  }
})
