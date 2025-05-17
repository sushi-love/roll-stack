import { db } from '~~/server/services/db'

export default defineEventHandler(async () => {
  try {
    const users = await db.getUserList()
    if (!users) {
      throw createError({
        statusCode: 404,
        message: 'Users not found',
      })
    }

    return users
  } catch (error) {
    throw errorResolver(error)
  }
})
