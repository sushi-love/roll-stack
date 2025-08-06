import { repository } from '@roll-stack/database'
import { Bot } from 'grammy'

const logger = useLogger('telegram:wasabi-vista')
const { telegram } = useRuntimeConfig()

let bot: Bot | null = null

export async function useCreateWasabiVistaBot() {
  bot = new Bot(telegram.wasabiVistaToken)

  bot.on('message:text', async (ctx) => {
    // const locale = ctx.message.from.language_code

    if (ctx.hasCommand('start')) {
      // Not private chat?
      if (ctx.message.chat.type !== 'private') {
        await ctx.reply('Я пока не умею отвечать на групповые сообщения.')
        return
      }

      // Find user
      const wasabiVistaUser = await repository.wasabiVista.findUserByTelegramId(ctx.message.from.id.toString())
      if (!wasabiVistaUser) {
        const accessKey = await generateAccessCode()

        const createdUser = await repository.wasabiVista.createUser({
          telegramId: ctx.message.from.id.toString(),
          accessKey,
          firstName: ctx.message.from.first_name,
          lastName: ctx.message.from.last_name,
          username: ctx.message.from.username,
          type: ctx.message.chat.type,
        })

        logger.log('new user', createdUser.id, ctx.message.from.id, ctx.message.text)

        await ctx.reply(`Ключ доступа: ${accessKey}`)

        return
      }

      if (!wasabiVistaUser.user) {
        await ctx.reply('Нет доступа. Используйте ранее полученный Ключ доступа. Или передайте его в службу поддержки.')
        return
      }

      await ctx.reply('Вы уже авторизованы.')
      return
    }

    logger.log(ctx.message.from.id, ctx.message.text)
    ctx.reply('Я пока не умею отвечать на сообщения.')
  })

  // Somebody invited bot to a group
  bot.on('my_chat_member', async (ctx) => {
    logger.log('my_chat_member', ctx.update)
  })

  try {
    await bot.start()
    logger.info('Wasabi Vista bot started successfully')
  } catch (error) {
    logger.error('Failed to start Wasabi Vista bot:', error)
    throw error
  }
}

export function useWasabiVistaBot(): Bot {
  if (!bot) {
    throw new Error('Wasabi Vista bot is not initialized. Call useCreateWasabiVistaBot() first.')
  }

  return bot
}

export async function notifyWasabiVistaAdmin(message: string) {
  return useWasabiVistaBot().api.sendMessage(telegram.adminId, message)
}

async function generateAccessCode(): Promise<string> {
  let selectedCode

  // Code should be unique
  while (!selectedCode) {
    const code = getRandInteger(100000, 999999).toString()
    const wasabiVistaUser = await repository.wasabiVista.findUserByKey(code)
    if (!wasabiVistaUser) {
      selectedCode = code
    }
  }

  return selectedCode
}
