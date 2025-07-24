<template>
  <UCard
    v-if="agreement"
    variant="subtle"
    class="h-full"
  >
    <div class="flex flex-col gap-3">
      <div class="flex flex-row items-start gap-3.5">
        <UIcon name="i-lucide-scroll-text" class="shrink-0 size-16 text-secondary" />

        <UProgress
          v-model="agreementProgress"
          size="lg"
          color="secondary"
          status
        />
      </div>

      <h3 class="text-xl md:text-xl/6 font-semibold">
        Договор №{{ agreement.internalId }}
      </h3>

      <div>
        <p v-if="agreement.concludedAt">
          Заключен: {{ format(new Date(agreement.concludedAt), 'd MMMM yyyy', { locale: ru }) }}
        </p>
        <p v-if="agreement.willEndAt">
          Действует до: {{ format(new Date(agreement.willEndAt), 'd MMMM yyyy', { locale: ru }) }}
        </p>
        <p>Роялти: {{ agreement.royalty }}%</p>
        <p>Мин. роялти: {{ agreement.minRoyaltyPerMonth }} ₽ / месяц</p>

        <p v-if="agreement.marketingFee">
          Маркетинговый сбор: {{ agreement.marketingFee }}%
        </p>
        <p v-if="agreement.minMarketingFeePerMonth">
          Мин. маркетинговый сбор: {{ agreement.minMarketingFeePerMonth }} ₽ / месяц
        </p>

        <p>Паушальный взнос: {{ agreement.lumpSumPayment }} ₽</p>
      </div>

      <p class="text-muted">
        {{ agreement.comment }}
      </p>
    </div>
  </UCard>
  <CreateCard
    v-else
    label="Добавить договор"
    icon="i-lucide-scroll-text"
    @click="modalCreatePartnerAgreement.open({ partnerId, legalEntityId })"
  />
</template>

<script setup lang="ts">
import type { PartnerAgreement } from '@roll-stack/database'
import { ModalCreatePartnerAgreement } from '#components'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale/ru'

const { agreement } = defineProps<{ partnerId: string, legalEntityId: string, agreement: PartnerAgreement | null | undefined }>()

const overlay = useOverlay()
const modalCreatePartnerAgreement = overlay.create(ModalCreatePartnerAgreement)

const agreementProgress = computed(() => {
  if (!agreement?.willEndAt || !agreement?.concludedAt) {
    return 0
  }

  const now = new Date()
  const concludedAt = new Date(agreement.concludedAt)
  const willEndAt = new Date(agreement.willEndAt)

  return Math.floor(100 - ((now.getTime() - concludedAt.getTime()) / (willEndAt.getTime() - concludedAt.getTime())) * 100)
})
</script>
