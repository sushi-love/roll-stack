import type { ProductWithData } from '~~/types'

export const useProductStore = defineStore('product', () => {
  const products = ref<ProductWithData[]>([])

  async function update() {
    try {
      const data = await $fetch('/api/product/list', {
        lazy: true,
        server: true,
        cache: 'no-cache',
        getCachedData: undefined,
      })
      if (!data) {
        return
      }

      products.value = data
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
    products,

    update,
  }
})
