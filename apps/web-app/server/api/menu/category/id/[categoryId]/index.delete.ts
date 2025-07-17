import { repository } from '@roll-stack/database'

export default defineEventHandler(async (event) => {
  try {
    const categoryId = getRouterParam(event, 'categoryId')
    if (!categoryId) {
      throw createError({
        statusCode: 400,
        message: 'Id is required',
      })
    }

    await repository.menu.deleteCategory(categoryId)

    return {
      ok: true,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
