<template>
  <UModal title="Загрузка отчета">
    <template #body>
      <FormUploadKitchenRevenue
        @submitted="overlay.closeAll"
        @success="overlay.closeAll"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
const overlay = useOverlay()
</script>
