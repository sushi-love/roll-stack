export default defineEventHandler(async () => {
  try {
    return { ok: true }
  } catch (error) {
    throw errorResolver(error)
  }
})
