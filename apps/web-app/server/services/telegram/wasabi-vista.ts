import { Bot } from 'grammy'

const logger = useLogger('telegram:wasabi-vista')
const { telegram } = useRuntimeConfig()

let bot: Bot | null = null

export function useCreateWasabiVistaBot() {
  bot = new Bot(telegram.wasabiVistaToken)

  bot.on('message:text', async (ctx) => {
    // const locale = ctx.message.from.language_code

    if (ctx.hasCommand('start')) {
      // Welcome message with buttons
      await ctx.reply(
        'Привет!',
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

  bot.start()
}

export function useWasabiVistaBot(): Bot {
  if (!bot) {
    throw new Error('Bot is not created')
  }

  return bot
}

export async function notifyWasabiVistaAdmin(message: string) {
  return useWasabiVistaBot().api.sendMessage(telegram.adminId, message)
}
