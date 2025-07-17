// https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: 'server',
  experimental: {
    tasks: true,
  },
  scheduledTasks: {
    '*/5 * * * *': ['yandex:update-data'], // Every 5 minutes
  },
  compatibilityDate: '2025-07-16',
})
