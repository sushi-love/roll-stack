<template>
  <ChatMessages :chat-id="params.chatId" />

  <div class="pb-4 px-0 sm:px-6 shrink-0">
    <div class="w-full mx-auto px-2 sm:px-6 lg:px-8 max-w-2xl">
      <FormCreateChatMessage :chat-id="params.chatId" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { params } = useRoute('chat-chatId')
</script>
