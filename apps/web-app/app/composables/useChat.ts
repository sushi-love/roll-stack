function _useChat() {
  const route = useRoute()

  const selectedChatId = ref<string | null>()

  function selectChat() {
    selectedChatId.value = null

    if (route.path.startsWith('/chat')) {
      const chatId = route.path.split('/')[2]
      if (!chatId) {
        return
      }

      selectedChatId.value = chatId
    }
  }

  onMounted(() => {
    selectChat()
  })

  watch(
    () => route.fullPath,
    () => selectChat(),
  )

  return {
    selectedChatId,
  }
}

export const useChat = createSharedComposable(_useChat)
