import { repository } from '@roll-stack/database'
import { type } from 'arktype'
import { createPostCommentSchema } from '~~/shared/services/post'

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

    const body = await readBody(event)
    const data = createPostCommentSchema(body)
    if (data instanceof type.errors) {
      throw data
    }

    const comment = await repository.post.createComment({
      ...data,
      userId: session.user.id,
      postId,
    })

    return {
      ok: true,
      result: comment,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
