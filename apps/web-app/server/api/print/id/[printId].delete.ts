import { repository } from '@sushi-atrium/database'

export default defineEventHandler(async (event) => {
  try {
    await hasPermission(event, 'print:delete')

    const printId = getRouterParam(event, 'printId')
    if (!printId) {
      throw createError({
        statusCode: 400,
        message: 'Id is required',
      })
    }

    await repository.print.delete(printId)

    return { ok: true }
  } catch (error) {
    throw errorResolver(error)
  }
})
