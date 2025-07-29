import { repository } from '@roll-stack/database'

export default defineTask({
  meta: {
    name: 'kitchen:average-update',
    description: 'Update average data of kitchens',
  },
  async run() {
    try {
      const revenuesToUpdate = await repository.kitchen.listRevenuesToUpdate()
      for (const revenue of revenuesToUpdate) {
        // Average check
        const averageCheck = Math.round(revenue.total / revenue.checks)

        // common
        const allRevenuesThisPeriod = await repository.kitchen.listRevenuesForDate(revenue.date)
        const commonAverageCheck = Math.round(allRevenuesThisPeriod.reduce((acc, curr) => acc + curr.averageCheck, 0) / allRevenuesThisPeriod.length)
        const commonTotal = Math.round(allRevenuesThisPeriod.reduce((acc, curr) => acc + curr.total, 0) / allRevenuesThisPeriod.length)

        await repository.kitchen.updateRevenue(revenue.id, {
          averageCheck,
          commonAverageCheck,
          commonTotal,
        })
      }
    } catch (error) {
      errorResolver(error)
    }

    return { result: true }
  },
})
