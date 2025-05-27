import { repository } from '@sushi-atrium/database'
import { type } from 'arktype'
import { updateTaskSchema } from '~~/shared/services/task'

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

    const task = await repository.task.update(taskId, data)

    return {
      ok: true,
      result: task,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
