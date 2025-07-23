import { repository } from '@roll-stack/database'
import { type } from 'arktype'
import { createPartnerAgreementSchema } from '~~/shared/services/partner'

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
    const data = createPartnerAgreementSchema(body)
    if (data instanceof type.errors) {
      throw data
    }

    const agreement = await repository.partner.createAgreement(data)
    if (!agreement?.id) {
      throw createError({
        statusCode: 400,
        message: 'Unable to create',
      })
    }

    // Update
    await repository.partner.update(partnerId, {
      activeAgreementId: agreement.id,
    })

    return {
      ok: true,
      result: agreement,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
