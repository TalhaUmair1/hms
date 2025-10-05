// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    'nuxt-auth-utils',
    'nuxt-authorization',
    '@vueuse/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  nitro: {
    experimental: {
      openAPI: true,
    },
    // database: {
    //   default: {
    //     connector: 'sqlite',
    //     options: { name: 'hms.db' },
    //   },
    // },
  },
})