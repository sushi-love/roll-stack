<template>
  <UModal :title="$t('app.update.product-photo.title')">
    <template #body>
      <FormUploadProductImage
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
