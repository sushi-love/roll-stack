import type { ClientReview } from '@roll-stack/database'

export const useClientStore = defineStore('client', () => {
  const reviews = ref<ClientReview[]>([])

  async function update() {
    try {
      const data = await $fetch('/api/client/review/list')
      if (!data) {
        return
      }

      reviews.value = data
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
    reviews,

    update,
  }
})
