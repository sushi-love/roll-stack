import type { PartnerDraft } from '../types'
import { eq } from 'drizzle-orm'
import { useDatabase } from '../database'
import { partners } from '../tables'

export class Partner {
  static async find(id: string) {
    return useDatabase().query.partners.findFirst({
      where: (partners, { eq }) => eq(partners.id, id),
    })
  }

  static async list() {
    return useDatabase().query.partners.findMany({
      where: (partners, { eq }) => eq(partners.isActive, true),
    })
  }

  static async create(data: PartnerDraft) {
    const [partner] = await useDatabase().insert(partners).values(data).returning()
    return partner
  }

  static async update(id: string, data: Partial<PartnerDraft>) {
    const [partner] = await useDatabase()
      .update(partners)
      .set(data)
      .where(eq(partners.id, id))
      .returning()
    return partner
  }

  static async delete(id: string) {
    return useDatabase().delete(partners).where(eq(partners.id, id))
  }
}
