import type { KitchenDraft } from '../types'
import { eq } from 'drizzle-orm'
import { useDatabase } from '../database'
import { kitchens } from '../tables'

export class Kitchen {
  static async find(id: string) {
    return useDatabase().query.kitchens.findFirst({
      where: (kitchens, { eq }) => eq(kitchens.id, id),
    })
  }

  static async list() {
    return useDatabase().query.kitchens.findMany({
      orderBy: (kitchens, { asc }) => asc(kitchens.name),
      with: {
        feedbackPoints: true,
        reviews: {
          orderBy: (reviews, { desc }) => desc(reviews.createdAt),
        },
      },
    })
  }

  static async create(data: KitchenDraft) {
    const [kitchen] = await useDatabase().insert(kitchens).values(data).returning()
    return kitchen
  }

  static async update(id: string, data: Partial<KitchenDraft>) {
    const [kitchen] = await useDatabase()
      .update(kitchens)
      .set(data)
      .where(eq(kitchens.id, id))
      .returning()
    return kitchen
  }

  static async delete(id: string) {
    return useDatabase().delete(kitchens).where(eq(kitchens.id, id))
  }
}
