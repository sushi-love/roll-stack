import type { MenuCategory, Product } from '@roll-stack/database'
import type { MenuWithData } from '~~/types'

type ProductWithCategory = Product & { category: MenuCategory }

export const useMenuStore = defineStore('menu', () => {
  const menu = ref<MenuWithData>()

  const products = computed(() => menu.value?.categories.flatMap((c) => c.products) || [])

  async function update() {
    try {
      const data = await $fetch('/api/menu', {
        lazy: true,
        server: true,
        cache: 'no-cache',
        getCachedData: undefined,
      })
      if (!data) {
        return
      }

      menu.value = data
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

  function getProductsForSearch(): ProductWithCategory[] {
    const result: ProductWithCategory[] = []

    menu.value?.categories.forEach((category) => {
      category.products.forEach((product) => {
        result.push({ ...product, category })
      })
    })

    return result
  }

  return {
    menu,

    products,

    update,
    getProductsForSearch,
  }
})
