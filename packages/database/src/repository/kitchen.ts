import type { KitchenDraft, KitchenRevenueDraft } from '../types'
import { eq, sql } from 'drizzle-orm'
import { useDatabase } from '../database'
import { kitchenRevenues, kitchens } from '../tables'

export class Kitchen {
  static async find(id: string) {
    return useDatabase().query.kitchens.findFirst({
      where: (kitchens, { eq }) => eq(kitchens.id, id),
    })
  }

  static async findRevenue(id: string) {
    return useDatabase().query.kitchenRevenues.findFirst({
      where: (revenues, { eq }) => eq(revenues.id, id),
    })
  }

  static async findRevenueByKitchenAndDate(kitchenId: string, date: Date) {
    return useDatabase().query.kitchenRevenues.findFirst({
      where: (revenues, { eq, and }) => and(
        eq(revenues.kitchenId, kitchenId),
        sql`date(${revenues.date}) = date(${date})`, // Same date
      ),
    })
  }

  static async list() {
    return useDatabase().query.kitchens.findMany({
      orderBy: (kitchens, { asc }) => asc(kitchens.name),
      with: {
        feedbackPoints: true,
      },
    })
  }

  static async listRevenuesByKitchen(kitchenId: string) {
    return useDatabase().query.kitchenRevenues.findMany({
      where: (revenues, { eq }) => eq(revenues.kitchenId, kitchenId),
      orderBy: (revenues, { desc }) => desc(revenues.date),
      limit: 1000,
    })
  }

  static async listRevenuesByKitchenForPeriod(kitchenId: string, start: Date, end: Date) {
    return useDatabase().query.kitchenRevenues.findMany({
      where: (revenues, { eq, and }) => and(
        eq(revenues.kitchenId, kitchenId),
        sql`date(${revenues.date}) >= date(${start})`,
        sql`date(${revenues.date}) <= date(${end})`,
      ),
      orderBy: (revenues, { desc }) => desc(revenues.date),
      limit: 1000,
    })
  }

  static async listRevenuesForDate(date: string) {
    return useDatabase().query.kitchenRevenues.findMany({
      where: (revenues, { and }) => and(
        sql`date(${revenues.date}) >= date(${date})`,
        sql`date(${revenues.date}) <= date(${date})`,
      ),
    })
  }

  static async listRevenuesToUpdate() {
    return useDatabase().query.kitchenRevenues.findMany({
      where: (revenues, { eq, or }) => or(
        eq(revenues.commonAverageCheck, 0),
      ),
      limit: 50,
    })
  }

  static async create(data: KitchenDraft) {
    const [kitchen] = await useDatabase().insert(kitchens).values(data).returning()
    return kitchen
  }

  static async createRevenue(data: KitchenRevenueDraft) {
    const [revenue] = await useDatabase().insert(kitchenRevenues).values(data).returning()
    return revenue
  }

  static async update(id: string, data: Partial<KitchenDraft>) {
    const [kitchen] = await useDatabase()
      .update(kitchens)
      .set({
        ...data,
        updatedAt: sql`now()`,
      })
      .where(eq(kitchens.id, id))
      .returning()
    return kitchen
  }

  static async updateRevenue(id: string, data: Partial<KitchenRevenueDraft>) {
    const [revenue] = await useDatabase()
      .update(kitchenRevenues)
      .set({
        ...data,
        updatedAt: sql`now()`,
      })
      .where(eq(kitchenRevenues.id, id))
      .returning()
    return revenue
  }

  static async delete(id: string) {
    return useDatabase().delete(kitchens).where(eq(kitchens.id, id))
  }
}
