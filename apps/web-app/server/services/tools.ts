import { tool } from '@openai/agents'
import { repository } from '@roll-stack/database'
import { z } from 'zod'

export const getPartnersTool = tool({
  name: 'get_all_partners',
  description: 'Get all partners',
  needsApproval: false,
  parameters: z.object({}),
  execute: async () => {
    return repository.partner.list()
  },
})

export const getPartnersByCityTool = tool({
  name: 'get_partners_by_city',
  description: 'Get partners by provided city name. The list returned may be longer than needed, requires rechecking',
  needsApproval: false,
  parameters: z.object({
    city: z.string(),
  }),
  execute: async ({ city }) => {
    const partners = await repository.partner.list()

    return partners.filter((partner) => partner.city?.toLowerCase().includes(city.toLowerCase()))
  },
})
