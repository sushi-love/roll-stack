import { repository } from '@roll-stack/database'

export default defineEventHandler(async (event) => {
  try {
    const ticketId = getRouterParam(event, 'ticketId')
    if (!ticketId) {
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

    return repository.ticket.listMessages(ticketId)
  } catch (error) {
    throw errorResolver(error)
  }
})
