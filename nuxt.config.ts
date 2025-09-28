// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-auth-utils'],
  css: ['~/assets/css/main.css'],
  // nitro: {
  //   experimental: {
  //     openAPI: true,
  //     database: true,
  //   },
  // },
  nitro: {
    experimental: {
      openAPI: true,
    },
    database: {
      default: {
        connector: 'sqlite',
        options: { name: 'hms.db' },
      },
    },
  },
})
