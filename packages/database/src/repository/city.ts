import type { CityDraft } from '../types'
import { eq } from 'drizzle-orm'
import { useDatabase } from '../database'
import { cities } from '../tables'

export class City {
  static async find(id: string) {
    return useDatabase().query.cities.findFirst({
      where: (cities, { eq }) => eq(cities.id, id),
    })
  }

  static async storefrontList() {
    return useDatabase().query.cities.findMany({
      where: (cities, { isNotNull }) => isNotNull(cities.storefrontUrl),
      orderBy: (cities, { asc }) => asc(cities.name),
    })
  }

  static async create(data: CityDraft) {
    const [city] = await useDatabase().insert(cities).values(data).returning()
    return city
  }

  static async update(id: string, data: Partial<CityDraft>) {
    const [city] = await useDatabase()
      .update(cities)
      .set(data)
      .where(eq(cities.id, id))
      .returning()
    return city
  }

  static async delete(id: string) {
    return useDatabase().delete(cities).where(eq(cities.id, id))
  }
}
