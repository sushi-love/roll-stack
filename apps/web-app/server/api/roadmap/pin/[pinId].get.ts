import { db } from '~~/server/services/db'

export default defineEventHandler(async (event) => {
  try {
    const pinId = getRouterParam(event, 'pinId')
    if (!pinId) {
      throw createError({
        statusCode: 400,
        message: 'Id is required',
      })
    }

    const pin = db.getPin(pinId)
    if (!pin) {
      throw createError({
        statusCode: 404,
        message: 'Pin not found',
      })
    }

    return pin
  } catch (error) {
    throw errorResolver(error)
  }
})
