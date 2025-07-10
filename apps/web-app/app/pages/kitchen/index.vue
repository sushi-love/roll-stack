<template>
  <Header :title="t('app.menu.kitchens')" />

  <Content>
    <div class="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <KitchenCard
        v-for="kitchen in kitchenStore.kitchens"
        :key="kitchen.id"
        :kitchen="kitchen"
      >
        {{ kitchen }}
      </KitchenCard>
    </div>
  </Content>
</template>

<script setup lang="ts">
// 48 kitchens should be
const { t } = useI18n()

const kitchenStore = useKitchenStore()

useHead({
  title: t('app.menu.kitchens'),
})
</script>
