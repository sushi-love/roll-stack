import { Bot } from 'grammy'

const logger = useLogger('telegram:wasabi-vista')
const { telegram } = useRuntimeConfig()

let bot: Bot | null = null

export async function useCreateWasabiVistaBot() {
  bot = new Bot(telegram.wasabiVistaToken)

  bot.on('message:text', async (ctx) => {
    // const locale = ctx.message.from.language_code

    if (ctx.hasCommand('start')) {
      // Welcome message with buttons
      await ctx.reply(
        `Ключ доступа: ${generateAccessCode()}`,
        // {
        //   reply_markup: {
        //     inline_keyboard: [
        //       [{ text: dictionary(locale).bots.woodland.title, url: woodlandsBotUrl }],
        //       [{ text: dictionary(locale).bots.subscribeToChannel, url: gameChannelUrl }],
        //       [{ text: dictionary(locale).bots.chatgame.playingOnTwitch, url: twitchUrl }],
        //     ],
        //   },
        // },
      )

      return
    }

    logger.log(ctx.message.from.id, ctx.message.text)
    ctx.reply('Я пока не умею отвечать на сообщения.')
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

function generateAccessCode(): string {
  return getRandInteger(100000, 999999).toString()
}
