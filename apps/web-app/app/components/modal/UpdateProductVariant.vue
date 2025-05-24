<template>
  <UModal :title="$t('app.update.product-variant.title')">
    <template #body>
      <FormUpdateProductVariant
        :product-variant-id="productVariantId ?? ''"
        @submitted="overlay.closeAll"
        @success="overlay.closeAll"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{
  productVariantId?: string
}>()

const overlay = useOverlay()
</script>
