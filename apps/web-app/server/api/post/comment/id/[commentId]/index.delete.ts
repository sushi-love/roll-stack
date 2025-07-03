import { repository } from '@sushi-atrium/database'

export default defineEventHandler(async (event) => {
  try {
    const commentId = getRouterParam(event, 'commentId')
    if (!commentId) {
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

    // Guard: not this user
    const commentInDB = await repository.post.findComment(commentId)
    if (!commentInDB) {
      throw createError({
        statusCode: 404,
        message: 'Not found',
      })
    }
    if (commentInDB.userId !== session.user.id) {
      throw createError({
        statusCode: 400,
        message: 'Not your comment',
      })
    }

    await repository.post.deleteComment(commentInDB.id)

    return {
      ok: true,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
