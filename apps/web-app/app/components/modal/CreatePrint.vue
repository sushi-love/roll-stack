<template>
  <UModal :title="$t('app.create.print.title')">
    <template #body>
      <FormCreatePrint @submitted="overlay.closeAll" @success="overlay.closeAll" />
    </template>
  </UModal>
</template>

<script setup lang="ts">
const overlay = useOverlay()
</script>
