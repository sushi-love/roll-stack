import { repository } from '@roll-stack/database'
import { endOfWeek, startOfWeek } from 'date-fns'

const logger = useLogger('kitchen:revenue-update')

export default defineTask({
  meta: {
    name: 'kitchen:revenue-update',
    description: 'Update weekly revenue of kitchens',
  },
  async run() {
    try {
      const kitchens = await repository.kitchen.list()

      // From this monday to sunday (use UTC+0 time zone)
      const now = new Date()

      const thisMonday = startOfWeek(now, { weekStartsOn: 1 })
      const thisSunday = endOfWeek(now, { weekStartsOn: 1 })

      logger.log(thisMonday, thisSunday)

      for (const kitchen of kitchens) {
        const revenues = await repository.kitchen.listRevenuesByKitchenForPeriod(kitchen.id, thisMonday, thisSunday)

        const revenueForThisWeek = revenues.reduce((acc, curr) => acc + curr.total, 0)

        await repository.kitchen.update(kitchen.id, {
          revenueForThisWeek,
        })

        // logger.log(`Kitchen ${kitchen.id}: Revenue updated from ${kitchen.revenueForThisWeek} to ${revenueForThisWeek}`)
      }
    } catch (error) {
      errorResolver(error)
    }

    return { result: true }
  },
})
