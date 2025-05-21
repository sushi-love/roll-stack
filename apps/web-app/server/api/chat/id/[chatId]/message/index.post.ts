import { repository } from '@sushi-atrium/database'
import { type } from 'arktype'
import { createChatMessageSchema } from '~~/shared/services/chat'

export default defineEventHandler(async (event) => {
  try {
    const chatId = getRouterParam(event, 'chatId')
    if (!chatId) {
      throw createError({
        statusCode: 400,
        message: 'Id is required',
      })
    }

    const body = await readBody(event)
    const data = createChatMessageSchema(body)
    if (data instanceof type.errors) {
      throw data
    }

    const session = await getUserSession(event)
    if (!session?.user) {
      throw createError({
        statusCode: 401,
        message: 'Not logged in',
      })
    }

    const chat = await repository.chat.findWithEntities(chatId)
    if (!chat) {
      throw createError({
        statusCode: 404,
        message: 'Chat not found',
      })
    }

    const message = await repository.chat.createMessage({
      chatId,
      userId: session.user.id,
      text: data.text,
    })
    if (!message) {
      throw createError({
        statusCode: 400,
        message: 'Failed to create message',
      })
    }

    // Last message in chat
    await repository.chat.update(chat.id, {
      lastMessageId: message.id,
    })

    return {
      ok: true,
      result: message,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
