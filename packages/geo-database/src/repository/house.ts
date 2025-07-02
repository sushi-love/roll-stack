import type { HouseDraft } from '../types'
import { eq } from 'drizzle-orm'
import { useDatabase } from '../database'
import { houses } from '../tables'

export class House {
  static async find(id: string) {
    return useDatabase().query.houses.findFirst({
      where: (houses, { eq }) => eq(houses.id, id),
    })
  }

  static async list() {
    return useDatabase().query.houses.findMany({
      where: (houses, { isNull }) => isNull(houses.parentId),
    })
  }

  static async listByParentId(parentId: string) {
    return useDatabase().query.houses.findMany({
      where: (houses, { eq, and }) => and(
        eq(houses.parentId, parentId),
        eq(houses.isActive, true),
      ),
      orderBy: (houses, { asc }) => asc(houses.number),
    })
  }

  static async create(data: HouseDraft) {
    const [house] = await useDatabase().insert(houses).values(data).returning()
    return house
  }

  static async update(id: string, data: Partial<HouseDraft>) {
    const [house] = await useDatabase()
      .update(houses)
      .set(data)
      .where(eq(houses.id, id))
      .returning()
    return house
  }

  static async delete(id: string) {
    return useDatabase().delete(houses).where(eq(houses.id, id))
  }
}
