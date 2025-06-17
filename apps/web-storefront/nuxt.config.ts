export default defineNuxtConfig({
  extends: ['@sushi-atrium/ui'],
  modules: ['nuxt-auth-utils', '@pinia/nuxt'],
  future: {
    compatibilityVersion: 4,
  },
  devtools: {
    componentInspector: false,
  },
  runtimeConfig: {
    public: {
      mediaUrl: '',
      cityId: '',
    },
  },
  css: ['~/assets/css/styles.css'],
  i18n: {
    locales: [
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru-RU.json' },
    ],
    strategy: 'no_prefix',
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  compatibilityDate: '2025-02-20',
})
