import type { City } from '@roll-stack/database'

export const useCityStore = defineStore('city', () => {
  const cities = ref<City[]>([])

  async function update() {
    try {
      const data = await $fetch('/api/city/list', {
        lazy: true,
        server: true,
        cache: 'no-cache',
        getCachedData: undefined,
      })
      if (!data) {
        return
      }

      cities.value = data
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          // No
        }
        if (error.message.includes('404')) {
          // Not found
        }
      }
    }
  }

  return {
    cities,

    update,
  }
})
