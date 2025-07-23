<template>
  <UModal title="Создание договора">
    <template #body>
      <FormCreatePartnerAgreement
        :partner-id="partnerId ?? ''"
        :legal-entity-id="legalEntityId ?? ''"
        @submitted="overlay.closeAll"
        @success="overlay.closeAll"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{
  partnerId?: string
  legalEntityId?: string
}>()

const overlay = useOverlay()
</script>
