<template>
  <Content>
    <div class="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
      <UCard>
        <div class="shrink-0 w-full flex flex-col gap-2">
          <div class="shrink-0 flex flex-row items-center gap-3.5">
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

          <p class="text-base/5">
            {{ partner?.city }}
          </p>
        </div>
      </UCard>

      <UCard>
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
          <p class="text-base/5">
            Престиж не является статичным - он может как укрепляться, так и утрачиваться в зависимости от действий Партнера, его достижений и общественного восприятия.
          </p>
        </div>
      </UCard>

      <div class="lg:col-span-2">
        <PartnerLegalEntityCard :partner-id="partner?.id ?? ''" :entity="partner?.legalEntity" />
      </div>

      <div
        v-for="agreement in partner?.legalEntity?.agreements"
        :key="agreement.id"
        class="lg:col-span-2"
      >
        <PartnerAgreementCard :agreement="agreement" />
      </div>
    </div>
  </Content>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { params } = useRoute('partner-id')

const partnerStore = usePartnerStore()
const partner = computed(() => partnerStore.partners.find((partner) => partner.id === params.id))

useHead({
  title: t('common.partner'),
})
</script>
