import type { Ticket, TicketMessage, User } from '@roll-stack/database'

type TicketWithData = Ticket & {
  messages: TicketMessage[]
  lastMessage: TicketMessage | null
  user: User
}

export const useTicketStore = defineStore('ticket', () => {
  const tickets = ref<TicketWithData[]>([])

  async function update() {
    try {
      const data = await $fetch('/api/ticket/list')
      if (!data) {
        return
      }

      tickets.value = data
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
    return tickets.value.find((t) => t.id === id)
  }

  return {
    tickets,

    update,
    find,
  }
})
