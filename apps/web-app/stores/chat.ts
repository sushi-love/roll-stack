import type { Chat, ChatMember, ChatMessage, User } from '@roll-stack/database'

type ChatMemberWithUser = ChatMember & {
  user: User
}

type ChatWithData = Chat & {
  messages: ChatMessage[]
  members: ChatMemberWithUser[]
  lastMessage: ChatMessage | null
}

export const useChatStore = defineStore('chat', () => {
  const chats = ref<ChatWithData[]>([])

  async function update() {
    try {
      const data = await $fetch('/api/chat/my')
      if (!data) {
        return
      }

      chats.value = data
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          // No session
        }
        if (error.message.includes('404')) {
          // Not found
        }
      }
    }
  }

  function find(id: string) {
    return chats.value.find((chat) => chat.id === id)
  }

  return {
    chats,

    update,
    find,
  }
})
