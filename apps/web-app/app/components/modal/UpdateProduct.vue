<template>
  <UModal :title="$t('app.update.product.title')">
    <template #body>
      <FormUpdateProduct
        :product-id="productId ?? ''"
        :redirect-to="redirectTo"
        @submitted="overlay.closeAll"
        @success="overlay.closeAll"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{
  productId?: string
  redirectTo: string
}>()

const overlay = useOverlay()
</script>
