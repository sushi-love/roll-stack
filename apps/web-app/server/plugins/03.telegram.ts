import process from 'node:process'
import { useCreateWasabiVistaBot } from '../services/telegram/wasabi-vista'

export default defineNitroPlugin(() => {
  const logger = useLogger('plugin:start-telegram')

  if (process.env.NODE_ENV !== 'production') {
    logger.info('Skipping Telegram in non-production environment')
    return
  }

  const { telegram } = useRuntimeConfig()

  if (!telegram.wasabiVistaToken) {
    // No config provided
    return
  }

  // Start the bots (using long polling)
  useCreateWasabiVistaBot()

  logger.success('Telegram server started')
})
