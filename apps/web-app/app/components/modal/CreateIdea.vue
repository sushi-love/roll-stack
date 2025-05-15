<template>
  <UModal :title="$t('app.create.idea.title')">
    <template #body>
      <FormCreateIdea @submitted="overlay.closeAll" @success="overlay.closeAll" />
    </template>
  </UModal>
</template>

<script setup lang="ts">
const overlay = useOverlay()
</script>
