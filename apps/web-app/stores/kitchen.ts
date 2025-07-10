import type { Kitchen } from '@sushi-atrium/database'

export const useKitchenStore = defineStore('kitchen', () => {
  const kitchens = ref<Kitchen[]>([])

  async function update() {
    try {
      const data = await $fetch('/api/kitchen/list', {
        lazy: true,
        server: true,
        cache: 'no-cache',
        getCachedData: undefined,
      })
      if (!data) {
        return
      }

      kitchens.value = data
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
    kitchens,

    update,
  }
})
