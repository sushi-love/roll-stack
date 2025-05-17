import { db } from '~~/server/services/db'

export default defineEventHandler(async (event) => {
  try {
    const userId = getRouterParam(event, 'userId')
    if (!userId) {
      throw createError({
        statusCode: 400,
        message: 'Id is required',
      })
    }

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
