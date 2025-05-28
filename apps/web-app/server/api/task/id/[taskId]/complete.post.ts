import { repository } from '@sushi-atrium/database'
import { type } from 'arktype'
import { completeTaskSchema } from '~~/shared/services/task'

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
    const data = completeTaskSchema(body)
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

    // Guards:
    // If task not exist
    // If performer is not user
    const task = await repository.task.find(taskId)
    if (!task) {
      throw createError({
        statusCode: 404,
        message: 'Task not found',
      })
    }
    if (task.performerId !== user.id) {
      throw createError({
        statusCode: 403,
        message: 'You are not the performer of this task',
      })
    }

    await repository.task.complete(taskId, {
      resolution: data.resolution,
      report: data.report,
    })

    // Clear focus if needed
    if (user.focusedTaskId === taskId) {
      await repository.user.update(user.id, {
        focusedTaskId: null,
      })
    }

    return { ok: true }
  } catch (error) {
    throw errorResolver(error)
  }
})
