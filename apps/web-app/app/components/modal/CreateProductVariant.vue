<template>
  <UModal :title="$t('app.create.product-variant.title')">
    <template #body>
      <FormCreateProductVariant
        :product-id="productId ?? ''"
        @submitted="overlay.closeAll"
        @success="overlay.closeAll"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{
  productId?: string
}>()

const overlay = useOverlay()
</script>
