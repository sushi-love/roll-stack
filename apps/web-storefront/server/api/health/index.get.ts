import { repository } from '@sushi-atrium/database'

export default defineEventHandler(async () => {
  try {
    await repository.checkHealth()

    return { ok: true }
  } catch (error) {
    throw errorResolver(error)
  }
})
