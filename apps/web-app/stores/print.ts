import type { PrintWithData } from '~~/types'

export const usePrintStore = defineStore('print', () => {
  const prints = ref<PrintWithData[]>([])

  async function update() {
    try {
      const data = await $fetch('/api/print/list')
      if (!data) {
        return
      }

      prints.value = data
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
    prints,

    update,
  }
})
