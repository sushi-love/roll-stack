function _useChat() {
  const route = useRoute()

  const selectedChatId = ref<string | null>()

  watch(
    () => route.fullPath,
    () => {
      selectedChatId.value = null

      if (route.path.startsWith('/chat')) {
        const chatId = route.path.split('/')[2]
        if (!chatId) {
          return
        }

        selectedChatId.value = chatId
      }
    },
  )

  return {
    selectedChatId,
  }
}

export const useChat = createSharedComposable(_useChat)
