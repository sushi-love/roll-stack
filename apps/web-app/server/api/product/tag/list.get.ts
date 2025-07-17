import { repository } from '@roll-stack/database'

export default defineEventHandler(async () => {
  try {
    return repository.product.listTags()
  } catch (error) {
    throw errorResolver(error)
  }
})
