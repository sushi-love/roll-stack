import { repository } from '@sushi-atrium/database'

export default defineEventHandler(async (event) => {
  try {
    const { secure } = await getUserSession(event)
    if (!secure?.checkoutId) {
      return null
    }

    return repository.checkout.find(secure.checkoutId)
  } catch (error) {
    throw errorResolver(error)
  }
})
