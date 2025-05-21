import { repository } from '@sushi-atrium/database'

export default defineEventHandler(async () => {
  try {
    return repository.user.findStaff()
  } catch (error) {
    throw errorResolver(error)
  }
})
