<template>
  <Content>
    <div class="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div class="flex flex-col gap-2.5">
        <img
          :src="partner?.avatarUrl ?? undefined"
          alt=""
          class="w-full rounded-lg"
        >
      </div>

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
    </div>

    <div class="flex flex-col items-start gap-2">
      <h2 class="text-xl md:text-3xl font-bold">
        {{ partner?.name }} {{ partner?.surname }}
      </h2>

      <p class="text-lg">
        {{ partner?.legal }}
      </p>

      <p class="text-base">
        {{ partner?.priceLevel }} уровень цен
      </p>

      <p class="text-base">
        {{ partner?.city }}
      </p>
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
