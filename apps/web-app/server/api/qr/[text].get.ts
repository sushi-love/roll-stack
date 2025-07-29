import { renderSVG } from 'uqr'

export default defineEventHandler(async (event) => {
  try {
    const text = getRouterParam(event, 'text')
    if (!text) {
      throw createError({
        statusCode: 400,
        message: 'Text is required',
      })
    }

    setHeader(event, 'Content-Type', 'image/svg+xml')

    return renderSVG(decodeURIComponent(text))
  } catch (error) {
    throw errorResolver(error)
  }
})
