<template>
  <UModal :title="$t('app.create.task-list.title')">
    <template #body>
      <FormCreateTaskList
        :user-id="userId"
        :chat-id="chatId"
        @submitted="overlay.closeAll"
        @success="overlay.closeAll"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{
  userId?: string
  chatId?: string
}>()

const overlay = useOverlay()
</script>
