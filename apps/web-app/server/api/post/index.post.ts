import { repository } from '@roll-stack/database'
import { type } from 'arktype'
import { createPostSchema } from '~~/shared/services/post'

export default defineEventHandler(async (event) => {
  try {
    await hasPermission(event, 'post:edit')

    const session = await getUserSession(event)
    if (!session?.user) {
      throw createError({
        statusCode: 401,
        message: 'Not logged in',
      })
    }

    const body = await readBody(event)
    const data = createPostSchema(body)
    if (data instanceof type.errors) {
      throw data
    }

    const post = await repository.post.create({
      ...data,
      authorId: session.user.id,
    })

    return {
      ok: true,
      result: post,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
