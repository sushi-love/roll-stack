<template>
  <div ref="block" class="flex-1 p-4 sm:p-6 overflow-y-auto">
    <UContainer class="max-w-2xl">
      <ChatMessages
        v-if="user.id"
        :messages="messages ?? []"
        :members="users ?? []"
        :user-id="user.id"
      />
    </UContainer>
  </div>

  <div class="pb-4 px-4 sm:px-6 shrink-0">
    <UContainer class="max-w-2xl">
      <FormCreateChatMessage :chat-id="params.chatId" />
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const { params } = useRoute('chat-chatId')
const user = useUserStore()

const { data } = await useFetch(`/api/chat/id/${params.chatId}`)
const { data: messages } = await useFetch(`/api/chat/id/${params.chatId}/message/list`)

const users = computed(() => data.value?.members.map((member) => member.user))

const block = useTemplateRef<HTMLDivElement>('block')

onMounted(() => {
  // Scroll to last message at bottom
  block.value?.scroll({ top: block.value.scrollHeight, behavior: 'smooth' })
})
</script>
