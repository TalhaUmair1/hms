import { useUserSession } from '#imports'

export default defineNuxtPlugin({
  name: 'authorization-resolver',
  parallel: true,
  setup() {
    return {
      provide: {
        authorization: {
          resolveClientUser: () => {
            const { user } = useUserSession()
            return user.value || null
          },
        },
      },
    }
  },
})
