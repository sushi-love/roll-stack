import process from 'node:process'
import { useCreateDatabase } from '@sushi-atrium/geo-database'

/**
 * DB init
 */
export default defineNitroPlugin(async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined')
  }

  useCreateDatabase(process.env.DATABASE_URL)
})
