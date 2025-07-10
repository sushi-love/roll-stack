<template>
  <Content>
    <div class="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <KitchenCard
        v-for="kitchen in partner?.kitchens"
        :key="kitchen.id"
        :kitchen="kitchen"
      >
        {{ kitchen }}
      </KitchenCard>
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
