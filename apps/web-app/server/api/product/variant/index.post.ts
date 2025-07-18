import { repository } from '@roll-stack/database'
import { type } from 'arktype'
import { createProductVariantSchema } from '~~/shared/services/product'

export default defineEventHandler(async (event) => {
  try {
    await hasPermission(event, 'product:edit')

    const body = await readBody(event)
    const data = createProductVariantSchema(body)
    if (data instanceof type.errors) {
      throw data
    }

    const variant = await repository.product.createVariant(data)

    return {
      ok: true,
      result: variant,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
