import { repository } from '@roll-stack/database'

export default defineEventHandler(async () => {
  try {
    return repository.product.listVariantTags()
  } catch (error) {
    throw errorResolver(error)
  }
})
