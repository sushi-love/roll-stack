import type { Task, User } from '@sushi-atrium/database'
import { repository } from '@sushi-atrium/database'
import { type } from 'arktype'
import { updateTaskSchema } from '~~/shared/services/task'
import { suffixByGender } from '~~/shared/utils/gender'

export default defineEventHandler(async (event) => {
  try {
    const taskId = getRouterParam(event, 'taskId')
    if (!taskId) {
      throw createError({
        statusCode: 400,
        message: 'Id is required',
      })
    }

    const body = await readBody(event)
    const data = updateTaskSchema(body)
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

    const task = await repository.task.find(taskId)
    if (!task) {
      throw createError({
        statusCode: 404,
        message: 'Task not found',
      })
    }

    const isPrivate = task.performerId === session.user.id && !task.chatId

    // Guard: If task is private - cannot change performer
    if (isPrivate && task.performerId !== data.performerId) {
      throw createError({
        statusCode: 403,
        message: 'Task is private',
      })
    }

    const updatedTask = await repository.task.update(taskId, data)
    if (!updatedTask) {
      throw createError({
        statusCode: 404,
        message: 'Task not found',
      })
    }

    let updatedPerformer
    if (updatedTask.performerId) {
      updatedPerformer = await repository.user.find(updatedTask.performerId)
    }

    // Bot notification in chat
    if (task.chatId) {
      const bot = await repository.chat.findNotificationBot(task.chatId)
      if (bot) {
        const text = prepareBotMessage(user, task, updatedTask, updatedPerformer)

        // Send message as bot
        await repository.chat.createMessage({
          chatId: task.chatId,
          userId: bot.user.id,
          text,
        })
      }
    }

    return {
      ok: true,
      result: updatedTask,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})

function prepareBotMessage(author: User, oldTask: Task, updatedTask: Task, updatedPerformer?: User) {
  let text = `${author.name} ${author.surname} ${suffixByGender(['обновил', 'обновила'], author.gender)} задачу «${updatedTask.name}»`

  if (oldTask.description !== updatedTask.description) {
    text += `\n💬 ${updatedTask.description}`
  }
  if (oldTask.performerId !== updatedTask.performerId) {
    if (!updatedPerformer) {
      text += '\n💪 Нет исполнителя'
    } else {
      text += `\n💪 ${updatedPerformer?.name} ${updatedPerformer?.surname}`
    }
  }

  return text
}
