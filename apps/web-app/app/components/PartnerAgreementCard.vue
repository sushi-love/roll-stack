<template>
  <UCard class="h-full" @click="modalUpdatePartnerAgreement.open({ agreementId: agreement.id })">
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
</template>

<script setup lang="ts">
import type { PartnerAgreement } from '@roll-stack/database'
import { ModalUpdatePartnerAgreement } from '#components'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale/ru'

const { agreement } = defineProps<{ agreement: PartnerAgreement }>()

const overlay = useOverlay()
const modalUpdatePartnerAgreement = overlay.create(ModalUpdatePartnerAgreement)

const agreementProgress = computed(() => {
  if (!agreement?.willEndAt || !agreement?.concludedAt) {
    return 0
  }

  const now = new Date()
  const concludedAt = new Date(agreement.concludedAt)
  const willEndAt = new Date(agreement.willEndAt)

  const res = Math.floor(100 - ((now.getTime() - concludedAt.getTime()) / (willEndAt.getTime() - concludedAt.getTime())) * 100)

  return res > 0 ? res : 0
})
</script>
