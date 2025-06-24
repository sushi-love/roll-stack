import { repository } from '@sushi-atrium/database'
import { type } from 'arktype'
import { createTaskSchema } from '~~/shared/services/task'
import { suffixByGender } from '~~/shared/utils/gender'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const data = createTaskSchema(body)
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

    const user = await repository.user.find(session.user.id)
    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'User not found',
      })
    }

    const task = await repository.task.create({
      name: data.name,
      description: data.description,
      date: data.date,
      performerId: data.performerId,
      listId: data.listId,
    })
    if (!task) {
      throw createError({
        statusCode: 500,
        message: 'Task not created',
      })
    }

    const list = await repository.task.findList(task.listId)
    if (!list) {
      throw createError({
        statusCode: 500,
        message: 'Task list not found',
      })
    }

    // Bot notification in chat
    if (list.chatId) {
      const bot = await repository.chat.findNotificationBot(list.chatId)
      if (bot) {
        const text = `${user.name} ${user.surname} ${suffixByGender(['создал', 'создала'], user.gender)} задачу «${task.name}»`

        // Send message as bot
        await repository.chat.createMessage({
          chatId: list.chatId,
          userId: bot.user.id,
          text,
        })
      }
    }

    return {
      ok: true,
      result: task,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
