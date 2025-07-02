<template>
  <UModal :title="$t('app.update.print.title')">
    <template #body>
      <FormUpdatePrint
        :print-id="printId ?? ''"
        :redirect-to="redirectTo"
        @submitted="overlay.closeAll"
        @success="overlay.closeAll"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{
  printId?: string
  redirectTo: string
}>()

const overlay = useOverlay()
</script>
