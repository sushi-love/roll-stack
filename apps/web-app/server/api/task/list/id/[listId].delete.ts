import { repository } from '@sushi-atrium/database'

export default defineEventHandler(async (event) => {
  try {
    const listId = getRouterParam(event, 'listId')
    if (!listId) {
      throw createError({
        statusCode: 400,
        message: 'Id is required',
      })
    }

    const list = await repository.task.findList(listId)
    if (!list) {
      throw createError({
        statusCode: 404,
        message: 'Task list not found',
      })
    }

    // Guard: if not this user in session
    const session = await getUserSession(event)
    if (!session?.user) {
      throw createError({
        statusCode: 401,
        message: 'Not logged in',
      })
    }
    if (session.user.id !== list.userId) {
      throw createError({
        statusCode: 403,
        message: 'Forbidden',
      })
    }

    // Archive, not delete
    await repository.task.updateList(listId, {
      isArchived: true,
    })

    return {
      ok: true,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
