<template>
  <UModal :title="$t('app.create.task.title')">
    <template #body>
      <FormCreateTask
        :performer-id="performerId"
        :chat-id="chatId"
        @submitted="overlay.closeAll"
        @success="overlay.closeAll"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{
  performerId?: string
  chatId?: string
}>()

const overlay = useOverlay()
</script>
