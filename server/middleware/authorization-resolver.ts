// server/middleware/authorization-resolver.ts
// import { getUserSession } from 'nuxt-auth-utils'

export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event)

  event.context.$authorization = event.context.$authorization || {}
  event.context.$authorization.resolveServerUser = async () => user

  //   console.log('[Resolver Middleware] user:', user)
})
