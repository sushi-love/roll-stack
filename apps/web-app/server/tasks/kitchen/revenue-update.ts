import { repository } from '@roll-stack/database'
import { endOfWeek, startOfWeek } from 'date-fns'

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
      const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000)

      const thisMonday = startOfWeek(utcNow, { weekStartsOn: 1 })
      const thisSunday = endOfWeek(utcNow, { weekStartsOn: 1 })

      for (const kitchen of kitchens) {
        const revenues = await repository.kitchen.listRevenuesByKitchenForPeriod(kitchen.id, thisMonday, thisSunday)

        const revenueForThisWeek = Math.round(revenues.reduce((acc, curr) => acc + curr.total, 0))
        if (revenueForThisWeek === kitchen.revenueForThisWeek) {
          continue
        }

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
