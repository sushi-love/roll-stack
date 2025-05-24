<template>
  <UModal title="Создание категории в меню">
    <template #body>
      <FormCreateMenuCategory
        :menu-id="menuId ?? ''"
        @submitted="overlay.closeAll"
        @success="overlay.closeAll"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{
  menuId?: string
}>()

const overlay = useOverlay()
</script>
