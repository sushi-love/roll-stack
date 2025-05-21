import { repository } from '@sushi-atrium/database'

export default defineEventHandler(async () => {
  try {
    return repository.user.findPartners()
  } catch (error) {
    throw errorResolver(error)
  }
})
