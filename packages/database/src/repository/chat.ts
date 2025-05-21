import type { ChatDraft } from '../types'
import { eq } from 'drizzle-orm'
import { useDatabase } from '../database'
import { chatMessages, chats } from '../tables'

export class Chat {
  static async find(id: string) {
    return useDatabase().query.chats.findFirst({
      where: (chat, { eq }) => eq(chat.id, id),
    })
  }

  static async findWithEntities(id: string) {
    return useDatabase().query.chats.findFirst({
      where: (chat, { eq }) => eq(chat.id, id),
      with: {
        members: {
          with: {
            user: true,
          },
        },
      },
    })
  }

  static async listByUser(userId: string) {
    const userAsMembers = await useDatabase().query.chatMembers.findMany({
      where: (chatMembers, { eq }) => eq(chatMembers.userId, userId),
      with: {
        chat: {
          with: {
            members: {
              with: {
                user: true,
              },
            },
            lastMessage: true,
          },
        },
      },
    })

    return userAsMembers.map(({ chat }) => chat)
  }

  static async listMessages(chatId: string) {
    return useDatabase().query.chatMessages.findMany({
      where: (chatMessages, { eq }) => eq(chatMessages.chatId, chatId),
    })
  }

  static async create(data: ChatDraft) {
    const [chat] = await useDatabase().insert(chats).values(data).returning()
    return chat
  }

  static async createMessage(data: { chatId: string, userId: string, text: string }) {
    const [message] = await useDatabase().insert(chatMessages).values(data).returning()
    return message
  }

  static async update(id: string, data: Partial<ChatDraft>) {
    const [chat] = await useDatabase()
      .update(chats)
      .set(data)
      .where(eq(chats.id, id))
      .returning()
    return chat
  }

  static async delete(id: string) {
    return useDatabase().delete(chats).where(eq(chats.id, id))
  }
}
