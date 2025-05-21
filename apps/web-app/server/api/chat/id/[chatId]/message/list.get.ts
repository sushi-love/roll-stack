import { repository } from '@sushi-atrium/database'

export default defineEventHandler(async (event) => {
  try {
    const chatId = getRouterParam(event, 'chatId')
    if (!chatId) {
      throw createError({
        statusCode: 400,
        message: 'Id is required',
      })
    }

    return repository.chat.listMessages(chatId)
  } catch (error) {
    throw errorResolver(error)
  }
})
