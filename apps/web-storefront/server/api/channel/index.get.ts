import { repository } from '@sushi-atrium/database'

export default defineEventHandler(async () => {
  try {
    const { public: { channelId } } = useRuntimeConfig()

    const channel = await repository.channel.find(channelId)
    if (!channel) {
      throw createError({
        statusCode: 404,
        message: 'Channel not found',
      })
    }

    return channel
  } catch (error) {
    throw errorResolver(error)
  }
})
