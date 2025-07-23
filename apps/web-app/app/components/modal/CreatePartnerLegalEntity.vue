<template>
  <UModal title="Создание юридического лица">
    <template #body>
      <FormCreatePartnerLegalEntity
        :partner-id="partnerId ?? ''"
        @submitted="overlay.closeAll"
        @success="overlay.closeAll"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{
  partnerId?: string
}>()

const overlay = useOverlay()
</script>
