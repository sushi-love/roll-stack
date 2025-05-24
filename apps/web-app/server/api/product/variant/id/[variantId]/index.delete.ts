import { repository } from '@sushi-atrium/database'

export default defineEventHandler(async (event) => {
  try {
    const variantId = getRouterParam(event, 'variantId')
    if (!variantId) {
      throw createError({
        statusCode: 400,
        message: 'Missing id',
      })
    }

    await repository.product.deleteVariant(variantId)

    return { ok: true }
  } catch (error) {
    throw errorResolver(error)
  }
})
