<template>
  <UDrawer
    v-if="!checkout.isEmpty"
    v-model:open="isCartDrawerOpened"
    direction="right"
    class="block xl:hidden"
  >
    <UChip
      :text="checkout.items.length"
      color="secondary"
      :ui="{
        base: 'size-5 text-sm',
      }"
    >
      <UButton
        variant="gradient"
        size="lg"
        class="min-w-16 justify-center"
        :label="$t('storefront.cart.title')"
      />
    </UChip>

    <template #content>
      <div class="py-2.5">
        <Cart />
      </div>
    </template>
  </UDrawer>
</template>

<script setup lang="ts">
const { isCartDrawerOpened } = useApp()
const checkout = useCheckoutStore()
</script>
