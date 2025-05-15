export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    if (!body?.phone) {
      throw createError({ statusCode: 400, message: 'Missing phone' })
    }

    // await setUserSession(event, {
    //   user: {
    //     id: user.id,
    //     isStaff: user.isStaff,
    //     name: user.name,
    //     permissions: user.permissions,
    //   },
    // })

    return { ok: true }
  } catch (error) {
    throw errorResolver(error)
  }
})
