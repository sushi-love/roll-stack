import type { Kitchen, Partner, PartnerAgreement, PartnerLegalEntity } from '@roll-stack/database'

type PartnerWithData = Partner & {
  kitchens: Kitchen[]
  legalEntity: PartnerLegalEntity | null
  activeAgreement: PartnerAgreement | null
}

export const usePartnerStore = defineStore('partner', () => {
  const partners = ref<PartnerWithData[]>([])

  async function update() {
    try {
      const data = await $fetch('/api/partner/list')
      if (!data) {
        return
      }

      partners.value = data
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('404')) {
          // Not found
        }
      }
    }
  }

  return {
    partners,

    update,
  }
})
