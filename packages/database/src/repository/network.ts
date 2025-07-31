import type { NetworkMetricsDraft } from '../types'
import { eq, sql } from 'drizzle-orm'
import { useDatabase } from '../database'
import { networkMetrics } from '../tables'

export class Network {
  static async findMetrics(id: string) {
    return useDatabase().query.networkMetrics.findFirst({
      where: (metrics, { eq }) => eq(metrics.id, id),
    })
  }

  static async listMetrics() {
    return useDatabase().query.networkMetrics.findMany({
      orderBy: (metrics, { desc }) => desc(metrics.date),
    })
  }

  static async listMetricsForDate(date: string) {
    return useDatabase().query.networkMetrics.findMany({
      where: (metrics, { and }) => and(
        sql`date(${metrics.date}) >= date(${date})`,
        sql`date(${metrics.date}) <= date(${date})`,
      ),
    })
  }

  static async createMetrics(data: NetworkMetricsDraft) {
    const [metrics] = await useDatabase().insert(networkMetrics).values(data).returning()
    return metrics
  }

  static async updateMetrics(id: string, data: Partial<NetworkMetricsDraft>) {
    const [metrics] = await useDatabase()
      .update(networkMetrics)
      .set(data)
      .where(eq(networkMetrics.id, id))
      .returning()
    return metrics
  }
}
