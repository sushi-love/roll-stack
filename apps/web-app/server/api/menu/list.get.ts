import { repository } from '@sushi-atrium/database'

export default defineEventHandler(async () => {
  try {
    return repository.menu.list()
  } catch (error) {
    throw errorResolver(error)
  }
})
