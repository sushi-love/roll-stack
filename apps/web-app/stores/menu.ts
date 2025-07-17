import type { MenuCategory, Product } from '@roll-stack/database'
import type { MenuWithData } from '~~/types'

type ProductWithCategory = Product & { category: MenuCategory }

export const useMenuStore = defineStore('menu', () => {
  const currencySign = ref('₽')
  const menus = ref<MenuWithData[]>([])

  const categories = computed<MenuCategory[]>(() => menus.value.flatMap((menu) => menu.categories))

  async function update() {
    try {
      const data = await $fetch('/api/menu/list', {
        lazy: true,
        server: true,
        cache: 'no-cache',
        getCachedData: undefined,
      })
      if (!data) {
        return
      }

      menus.value = data
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

  function getProductsForSearch(menuId: string): ProductWithCategory[] {
    const menu = menus.value.find((menu) => menu.id === menuId)
    if (!menu) {
      return []
    }

    const result: ProductWithCategory[] = []

    menu.categories.forEach((category) => {
      category.products.forEach((product) => {
        result.push({ ...product, category })
      })
    })

    return result
  }

  return {
    currencySign,
    menus,

    categories,

    update,
    getProductsForSearch,
  }
})
