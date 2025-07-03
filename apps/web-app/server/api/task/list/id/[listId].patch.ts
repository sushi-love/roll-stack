import { repository } from '@sushi-atrium/database'
import { type } from 'arktype'
import { updateTaskListSchema } from '~~/shared/services/task'

export default defineEventHandler(async (event) => {
  try {
    const listId = getRouterParam(event, 'listId')
    if (!listId) {
      throw createError({
        statusCode: 400,
        message: 'Id is required',
      })
    }

    const session = await getUserSession(event)
    if (!session?.user) {
      throw createError({
        statusCode: 401,
        message: 'Not logged in',
      })
    }

    const list = await repository.task.findList(listId)
    if (!list) {
      throw createError({
        statusCode: 404,
        message: 'Task list not found',
      })
    }

    // Guard: if don't have access
    const canEdit = list.chat?.members.some((member) => member.userId === session.user?.id)
    if (!canEdit) {
      throw createError({
        statusCode: 403,
        message: 'Forbidden',
      })
    }

    const body = await readBody(event)
    const data = updateTaskListSchema(body)
    if (data instanceof type.errors) {
      throw data
    }

    const updatedList = await repository.task.updateList(listId, data)

    return {
      ok: true,
      result: updatedList,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
