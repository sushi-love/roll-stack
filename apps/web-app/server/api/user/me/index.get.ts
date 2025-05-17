import { db } from '~~/server/services/db'

export default defineEventHandler(async () => {
  try {
    const userId = '1'

    const user = await db.getUser(userId)
    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'User not found',
      })
    }

    return user
  } catch (error) {
    throw errorResolver(error)
  }
})
