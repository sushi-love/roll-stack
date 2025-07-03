import { repository } from '@sushi-atrium/database'
import { type } from 'arktype'
import { createTaskListSchema } from '~~/shared/services/task'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const data = createTaskListSchema(body)
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

    const list = await repository.task.createList({
      name: data.name,
      chatId: data.chatId,
    })
    if (!list) {
      throw createError({
        statusCode: 500,
        message: 'List not created',
      })
    }

    return {
      ok: true,
      result: list,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
