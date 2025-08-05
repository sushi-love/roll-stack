import process from 'node:process'
import { useCreateWasabiVistaBot } from '../services/telegram/wasabi-vista'

export default defineNitroPlugin(() => {
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  const logger = useLogger('plugin-start-telegram')
  const { telegramWasabiVistaToken } = useRuntimeConfig()

  if (!telegramWasabiVistaToken) {
    // No config provided
    return
  }

  // Start the bots (using long polling)
  useCreateWasabiVistaBot()

  logger.success('Telegram server started')
})
