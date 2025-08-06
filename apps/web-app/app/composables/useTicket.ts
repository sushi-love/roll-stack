function _useTicket() {
  const route = useRoute()

  const selectedId = ref<string | null>()

  function select() {
    selectedId.value = null

    if (route.path.startsWith('/ticket')) {
      const id = route.path.split('/')[2]
      if (!id) {
        return
      }

      selectedId.value = id
    }
  }

  onMounted(() => {
    select()
  })

  watch(
    () => route.fullPath,
    () => select(),
  )

  return {
    selectedId,
  }
}

export const useTicket = createSharedComposable(_useTicket)
