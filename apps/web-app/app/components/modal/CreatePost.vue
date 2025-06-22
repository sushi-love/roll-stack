<template>
  <UModal :title="$t('app.create.post.title')">
    <template #body>
      <FormCreatePost @submitted="overlay.closeAll" @success="overlay.closeAll" />
    </template>
  </UModal>
</template>

<script setup lang="ts">
const overlay = useOverlay()
</script>
