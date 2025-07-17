import type { KitchenWithData } from '~~/types'

export const useKitchenStore = defineStore('kitchen', () => {
  const kitchens = ref<KitchenWithData[]>([])

  async function update() {
    try {
      const data = await $fetch('/api/kitchen/list')
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
