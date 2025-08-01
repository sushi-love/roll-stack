import { repository } from '@roll-stack/database'
import { type } from 'arktype'
import { createPartnerLegalEntitySchema } from '~~/shared/services/partner'

export default defineEventHandler(async (event) => {
  try {
    // await hasPermission(event, 'product:delete')

    const partnerId = getRouterParam(event, 'partnerId')
    if (!partnerId) {
      throw createError({
        statusCode: 400,
        message: 'Id is required',
      })
    }

    const body = await readBody(event)
    const data = createPartnerLegalEntitySchema(body)
    if (data instanceof type.errors) {
      throw data
    }

    const entity = await repository.partner.createLegalEntity(data)
    if (!entity?.id) {
      throw createError({
        statusCode: 400,
        message: 'Unable to create legal entity',
      })
    }

    // Update
    await repository.partner.update(partnerId, {
      legalEntityId: entity.id,
    })

    return {
      ok: true,
      result: entity,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
