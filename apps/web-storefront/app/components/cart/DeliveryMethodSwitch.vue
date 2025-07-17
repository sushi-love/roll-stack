<template>
  <UTabs
    v-model="selectedTab"
    :items="tabItems"
    :content="false"
    size="md"
    variant="gradient"
  />
</template>

<script setup lang="ts">
import type { Checkout } from '@roll-stack/database'

const { t } = useI18n()
const checkout = useCheckoutStore()

const tabItems = computed(() => [{
  label: t('storefront.cart.delivery'),
  value: 'delivery',
  // disabled: !channel.isDeliveryAvailable,
}, {
  label: t('storefront.cart.pickup'),
  value: 'pickup',
  // disabled: !channel.isPickupAvailable,
}])
const selectedTab = ref<Checkout['deliveryMethod'] | undefined>(checkout.deliveryMethod)

watch (selectedTab, () => {
  if (!selectedTab.value) {
    return
  }

  checkout.change({ deliveryMethod: selectedTab.value })
})
</script>
