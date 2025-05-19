<template>
  <ChatBlock :chat-id="params.chatId" />
</template>

<script setup lang="ts">
const { params } = useRoute('chat-chatId')
</script>
