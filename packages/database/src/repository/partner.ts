import type { PartnerAgreementDraft, PartnerDraft, PartnerLegalEntityDraft } from '../types'
import { eq } from 'drizzle-orm'
import { useDatabase } from '../database'
import { partnerAgreements, partnerLegalEntities, partners } from '../tables'

export class Partner {
  static async find(id: string) {
    return useDatabase().query.partners.findFirst({
      where: (partners, { eq }) => eq(partners.id, id),
      with: {
        kitchens: true,
      },
    })
  }

  static async findAgreement(id: string) {
    return useDatabase().query.partnerAgreements.findFirst({
      where: (agreements, { eq }) => eq(agreements.id, id),
    })
  }

  static async list() {
    return useDatabase().query.partners.findMany({
      where: (partners, { eq }) => eq(partners.isActive, true),
    })
  }

  static async listWithData() {
    return useDatabase().query.partners.findMany({
      where: (partners, { eq }) => eq(partners.isActive, true),
      with: {
        kitchens: true,
        legalEntity: {
          with: {
            agreements: {
              with: {
                files: true,
              },
            },
          },
        },
      },
    })
  }

  static async create(data: PartnerDraft) {
    const [partner] = await useDatabase().insert(partners).values(data).returning()
    return partner
  }

  static async createLegalEntity(data: PartnerLegalEntityDraft) {
    const [legalEntity] = await useDatabase().insert(partnerLegalEntities).values(data).returning()
    return legalEntity
  }

  static async createAgreement(data: PartnerAgreementDraft) {
    const [agreement] = await useDatabase().insert(partnerAgreements).values(data).returning()
    return agreement
  }

  static async update(id: string, data: Partial<PartnerDraft>) {
    const [partner] = await useDatabase()
      .update(partners)
      .set(data)
      .where(eq(partners.id, id))
      .returning()
    return partner
  }

  static async updateAgreement(id: string, data: Partial<PartnerAgreementDraft>) {
    const [agreement] = await useDatabase()
      .update(partnerAgreements)
      .set(data)
      .where(eq(partnerAgreements.id, id))
      .returning()
    return agreement
  }

  static async delete(id: string) {
    return useDatabase().delete(partners).where(eq(partners.id, id))
  }
}
