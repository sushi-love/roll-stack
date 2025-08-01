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

    return repository.payment.listMethods()
  } catch (error) {
    throw errorResolver(error)
  }
})
