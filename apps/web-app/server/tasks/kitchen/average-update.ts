import { repository } from '@roll-stack/database'

export default defineTask({
  meta: {
    name: 'kitchen:average-update',
    description: 'Update average data of kitchens',
  },
  async run() {
    try {
      const revenues = await repository.kitchen.listRevenuesToUpdate()
      let metrics = await repository.network.listMetrics()

      for (const revenue of revenues) {
        // If have metric for this date
        if (metrics.find((metric) => metric.date === revenue.date)) {
          continue
        }

        const allRevenuesThisPeriod = await repository.kitchen.listRevenuesForDate(revenue.date)
        const averageCheck = Math.round(allRevenuesThisPeriod.reduce((acc, curr) => acc + curr.averageCheck, 0) / allRevenuesThisPeriod.length)
        const total = Math.round(allRevenuesThisPeriod.reduce((acc, curr) => acc + curr.total, 0) / allRevenuesThisPeriod.length)

        await repository.network.createMetrics({
          date: revenue.date,
          averageCheck,
          total,
        })

        // Update
        metrics = await repository.network.listMetrics()
      }
    } catch (error) {
      errorResolver(error)
    }

    return { result: true }
  },
})
