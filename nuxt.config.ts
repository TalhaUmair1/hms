// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    'nuxt-auth-utils',
    'nuxt-authorization',
    '@vueuse/nuxt',
    '@nuxt/content',
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
  hooks: {
    'pages:extend'(pages) {
      function setMiddleware(pages: NuxtPage[]) {
        for (const page of pages) {
          // Apply auth middleware only to dashboard routes
          if (page.path?.startsWith('/dashboard')) {
            page.meta ||= {}
            page.meta.middleware = ['auth']
          }
          if (page.children) {
            setMiddleware(page.children)
          }
        }
      }
      setMiddleware(pages)
    },
  },
})
