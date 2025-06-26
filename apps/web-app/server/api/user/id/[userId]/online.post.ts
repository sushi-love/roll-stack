import { repository } from '@sushi-atrium/database'

export default defineEventHandler(async (event) => {
  try {
    const userId = getRouterParam(event, 'userId')
    if (!userId) {
      throw createError({
        statusCode: 400,
        message: 'Id is required',
      })
    }

    // Guard: if no user
    const user = await repository.user.find(userId)
    if (!user?.id) {
      throw createError({
        statusCode: 400,
        message: 'User already have info',
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
    if (session.user.id !== userId) {
      throw createError({
        statusCode: 403,
        message: 'Forbidden',
      })
    }

    await repository.user.updateOnline(userId)

    return {
      ok: true,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
