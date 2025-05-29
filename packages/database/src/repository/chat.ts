import type { ChatDraft, ChatMemberDraft } from '../types'
import { eq, sql } from 'drizzle-orm'
import { useDatabase } from '../database'
import { chatMembers, chatMessages, chats } from '../tables'

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

  static async findNotificationBot(chatId: string) {
    return useDatabase().query.chatMembers.findFirst({
      where: (member, { eq, and }) => and(eq(member.chatId, chatId), eq(member.userId, 'fsti10ba0cb7uxkal4uoja9r')),
      with: {
        user: true,
      },
    })
  }

  static async listByUser(userId: string) {
    const userAsMembers = await useDatabase().query.chatMembers.findMany({
      where: (chatMembers, { eq }) => eq(chatMembers.userId, userId),
      orderBy: (chatMembers, { desc }) => desc(chatMembers.updatedAt),
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

  static async listTasks(chatId: string) {
    return useDatabase().query.tasks.findMany({
      where: (tasks, { eq }) => eq(tasks.chatId, chatId),
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

  static async createMember(data: ChatMemberDraft) {
    const [member] = await useDatabase().insert(chatMembers).values(data).returning()
    return member
  }

  static async update(id: string, data: Partial<ChatDraft>) {
    const [chat] = await useDatabase()
      .update(chats)
      .set({
        ...data,
        updatedAt: sql`now()`,
      })
      .where(eq(chats.id, id))
      .returning()
    return chat
  }

  static async delete(id: string) {
    return useDatabase().delete(chats).where(eq(chats.id, id))
  }
}
