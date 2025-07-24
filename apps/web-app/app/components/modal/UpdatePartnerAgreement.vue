<template>
  <UModal title="Обновление договора">
    <template #body>
      <FormUpdatePartnerAgreement
        :agreement-id="agreementId"
        @submitted="overlay.closeAll"
        @success="overlay.closeAll"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{
  agreementId: string
}>()

const overlay = useOverlay()
</script>
