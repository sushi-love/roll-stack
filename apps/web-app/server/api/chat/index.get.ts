import { db } from '~~/server/services/db'

export default defineEventHandler(async () => {
  try {
    return db.getChatList()
  } catch (error) {
    throw errorResolver(error)
  }
})
