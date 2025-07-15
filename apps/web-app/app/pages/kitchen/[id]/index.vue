<template>
  <Content>
    <div class="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      <UCard class="col-span-2">
        <UIcon name="i-lucide-store" class="size-32 text-muted/25" />

        <div class="flex flex-col items-start gap-2">
          <h2 class="text-xl md:text-2xl font-bold">
            {{ kitchen?.address }}
          </h2>

          <p class="text-lg">
            {{ kitchen?.city }}
          </p>
        </div>
      </UCard>

      <NuxtLink v-if="partner" :to="`/partner/${partner.id}`">
        <PartnerCard :partner="partner" />
      </NuxtLink>
    </div>
  </Content>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { params } = useRoute('kitchen-id')

const partnerStore = usePartnerStore()
const kitchenStore = useKitchenStore()
const kitchen = computed(() => kitchenStore.kitchens.find((k) => k.id === params.id))
const partner = computed(() => partnerStore.partners.find((partner) => partner.id === kitchen.value?.partnerId))

useHead({
  title: t('common.kitchen'),
})
</script>
