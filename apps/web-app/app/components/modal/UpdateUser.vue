<template>
  <UModal :title="$t('app.update.user.title')">
    <template #body>
      <FormUpdateUser
        @submitted="overlay.closeAll"
        @success="overlay.closeAll"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
const overlay = useOverlay()
</script>
