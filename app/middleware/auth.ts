// middleware/auth.ts
export default defineNuxtRouteMiddleware(() => {
  const { user, loggedIn } = useUserSession()

  if (!loggedIn.value) {
    return navigateTo('/login')
  }
})
