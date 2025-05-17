import { db } from '~~/server/services/db'

export default defineEventHandler(async () => {
  try {
    return db.getPinList()
  } catch (error) {
    throw errorResolver(error)
  }
})
