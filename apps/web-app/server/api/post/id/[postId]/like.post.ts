import { repository } from '@sushi-atrium/database'

export default defineEventHandler(async (event) => {
  try {
    const postId = getRouterParam(event, 'postId')
    if (!postId) {
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

    // Guard: already have like on this post
    const likeInDB = await repository.post.findLike(postId, session.user.id)
    if (likeInDB) {
      throw createError({
        statusCode: 400,
        message: 'Already liked this post',
      })
    }

    const like = await repository.post.createLike(postId, session.user.id)

    return {
      ok: true,
      result: like,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
