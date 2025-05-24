import { repository } from '@sushi-atrium/database'

export default defineEventHandler(async () => {
  try {
    return repository.product.list()
  } catch (error) {
    throw errorResolver(error)
  }
})
