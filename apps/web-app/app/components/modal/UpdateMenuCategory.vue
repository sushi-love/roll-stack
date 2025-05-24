<template>
  <UModal :title="$t('app.update.menu-category.title')">
    <template #body>
      <FormUpdateMenuCategory
        :category-id="categoryId"
        :redirect-to="redirectTo"
        @submitted="overlay.closeAll"
        @success="overlay.closeAll"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{
  categoryId: string
  redirectTo: string
}>()

const overlay = useOverlay()
</script>
