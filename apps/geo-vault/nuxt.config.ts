export default defineNuxtConfig({
  modules: ['nuxt-auth-utils'],
  future: {
    compatibilityVersion: 4,
  },
  devtools: {
    componentInspector: false,
  },
  runtimeConfig: {
    s3: {
      bucket: '',
      region: '',
      endpoint: '',
      accessKeyId: '',
      secretAccessKey: '',
    },
    public: {
      mediaUrl: '',
    },
  },
  compatibilityDate: '2025-02-20',
})
