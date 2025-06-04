import { repository } from '@sushi-atrium/database'

export default defineEventHandler(async () => {
  try {
    return repository.product.listVariantTags()
  } catch (error) {
    throw errorResolver(error)
  }
})
