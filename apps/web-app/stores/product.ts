import type { ProductTag } from '@sushi-atrium/database'
import type { ProductWithData } from '~~/types'

export const useProductStore = defineStore('product', () => {
  const products = ref<ProductWithData[]>([])
  const tags = ref<ProductTag[]>([])

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

      await updateTags()
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

  async function updateTags() {
    try {
      const data = await $fetch('/api/product/tag/list', {
        lazy: true,
        server: true,
        cache: 'no-cache',
        getCachedData: undefined,
      })
      if (!data) {
        return
      }

      tags.value = data
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
    tags,

    update,
  }
})
