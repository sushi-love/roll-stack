import type { Menu, MenuCategory } from '@sushi-atrium/database'

type MenuWithData = Menu & {
  categories: MenuCategory[]
}

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

  return {
    currencySign,
    menus,

    categories,

    update,
  }
})
