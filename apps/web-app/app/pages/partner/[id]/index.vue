<template>
  <Content>
    <div class="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <UCard variant="subtle" class="col-span-1">
        <div class="flex flex-col gap-2.5">
          <div class="flex flex-col items-start gap-2">
            <div class="flex flex-row items-center gap-3.5">
              <img
                :src="partner?.avatarUrl ?? undefined"
                alt=""
                class="aspect-square size-20 rounded-lg"
              >
              <h2 class="text-xl md:text-2xl/7 font-semibold">
                {{ partner?.name }} {{ partner?.surname }}
              </h2>
            </div>

            <p class="text-base">
              {{ partner?.priceLevel }} уровень цен
            </p>

            <p class="text-base">
              {{ partner?.city }}
            </p>
          </div>
        </div>
      </UCard>

      <UCard class="col-span-1">
        <div class="flex flex-col gap-2.5">
          <div class="flex flex-row items-center gap-1.5">
            <PartnerPrestigeBadge
              :prestige="partner?.prestige ?? 0"
              size="lg"
              class="group-hover:scale-125 duration-200"
            />
            <h3 class="text-xl md:text-2xl font-semibold">
              Престиж
            </h3>
          </div>
          <p class="text-muted leading-5">
            Престиж не является статичным - он может как укрепляться, так и утрачиваться в зависимости от действий Партнера, его достижений и общественного восприятия.
          </p>
        </div>
      </UCard>

      <UCard v-if="partner?.legalEntity" class="col-span-2">
        <div class="flex flex-col gap-2.5">
          <UIcon name="i-lucide-scale" class="size-16 text-muted/25" />

          <h3 class="text-xl md:text-xl/6 font-semibold">
            {{ partner.legalEntity.name }}
          </h3>

          <div>
            <p>ИНН {{ partner.legalEntity.inn }}</p>
            <p>ОГРНИП {{ partner.legalEntity.ogrnip }}</p>
          </div>

          <p class="text-muted">
            {{ partner.legalEntity.comment }}
          </p>
        </div>
      </UCard>

      <UCard
        v-if="partner?.activeAgreement"
        variant="subtle"
        class="col-span-2"
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
            Договор №{{ partner.activeAgreement.internalId }}
          </h3>

          <div>
            <p v-if="partner.activeAgreement.willEndAt">
              Заключен до {{ format(new Date(partner.activeAgreement.willEndAt), 'd MMMM yyyy', { locale: ru }) }}
            </p>
            <p>Роялти: {{ partner.activeAgreement.royalty }}%</p>
            <p>Мин. роялти: {{ partner.activeAgreement.minRoyaltyPerMonth }} ₽ / месяц</p>

            <p v-if="partner.activeAgreement.marketingFee">
              Маркетинговый сбор: {{ partner.activeAgreement.marketingFee }}%
            </p>
            <p v-if="partner.activeAgreement.minMarketingFeePerMonth">
              Мин. маркетинговый сбор: {{ partner.activeAgreement.minMarketingFeePerMonth }} ₽ / месяц
            </p>

            <p>Паушальный взнос: {{ partner.activeAgreement.lumpSumPayment }} ₽</p>
          </div>

          <p class="text-muted">
            {{ partner.activeAgreement.comment }}
          </p>
        </div>
      </UCard>
    </div>
  </Content>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { ru } from 'date-fns/locale/ru'

const { t } = useI18n()
const { params } = useRoute('partner-id')

const partnerStore = usePartnerStore()
const partner = computed(() => partnerStore.partners.find((partner) => partner.id === params.id))

const agreementProgress = computed(() => {
  if (!partner.value?.activeAgreement?.willEndAt || !partner.value?.activeAgreement?.concludedAt) {
    return 0
  }

  const now = new Date()
  const concludedAt = new Date(partner.value.activeAgreement.concludedAt)
  const willEndAt = new Date(partner.value.activeAgreement.willEndAt)

  return Math.floor(100 - ((now.getTime() - concludedAt.getTime()) / (willEndAt.getTime() - concludedAt.getTime())) * 100)
})

useHead({
  title: t('common.partner'),
})
</script>
