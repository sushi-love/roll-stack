import { repository } from '@roll-stack/database'

export default defineEventHandler(async (event) => {
  try {
    const session = await getUserSession(event)
    if (!session?.user) {
      throw createError({
        statusCode: 401,
        message: 'Not logged in',
      })
    }

    const userInDB = await repository.user.find(session.user.id)
    if (!userInDB) {
      throw createError({
        statusCode: 404,
        message: 'User not found',
      })
    }

    return userInDB
  } catch (error) {
    throw errorResolver(error)
  }
})
