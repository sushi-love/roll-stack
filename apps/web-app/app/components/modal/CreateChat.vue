<template>
  <UModal :title="$t('app.create.chat.title')">
    <template #body>
      <FormCreateChat @submitted="overlay.closeAll" @success="overlay.closeAll" />
    </template>
  </UModal>
</template>

<script setup lang="ts">
const overlay = useOverlay()
</script>
