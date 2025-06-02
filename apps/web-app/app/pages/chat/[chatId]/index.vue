<template>
  <ChatMessages :messages="chat?.messages ?? []" :members="users ?? []" />

  <div class="pb-4 px-4 sm:px-6 shrink-0">
    <UContainer class="max-w-2xl">
      <FormCreateChatMessage :chat-id="params.chatId" />
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const { params } = useRoute('chat-chatId')

const chatStore = useChatStore()

const chat = computed(() => chatStore.chats.find((chat) => chat.id === params.chatId))
const users = computed(() => chat.value?.members.map((member) => member.user))
</script>
