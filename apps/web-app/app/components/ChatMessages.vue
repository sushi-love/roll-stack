<template>
  <div class="w-full flex flex-col gap-2 flex-1 px-2.5 [&>article]:last-of-type:min-h-(--last-message-height) last-of-type:mb-20" style="--last-message-height: 0px;">
    <ChatMessage
      v-for="message in messages"
      :key="message.id"
      :created-at="message.createdAt"
      :user-id="message.userId"
      :text="message.text"
      :avatar-url="members.find((member) => member.id === message.userId)?.avatarUrl ?? undefined"
      :side="userId === message.userId ? 'right' : 'left'"
      :is-first-message-of-day="messagesWithIsFirstMessageOfDay.some((item) => item.id === message.id)"
    />
  </div>
</template>

<script setup lang="ts">
import type { User } from '@sushi-atrium/database'

interface Message {
  id: string
  createdAt: string
  text: string | null
  userId: string
}

const { messages } = defineProps<{ messages: Message[], members: User[], userId: string }>()

// show is-first-message-of-day if it's first message of day
const messagesWithIsFirstMessageOfDay = ref<{ id: string, isFirstMessageOfDay: boolean }[]>([])
const lastDay = ref<number>()

for (const message of messages) {
  const day = new Date(message.createdAt).getDate()
  if (lastDay.value !== day) {
    lastDay.value = day
    messagesWithIsFirstMessageOfDay.value.push({ id: message.id, isFirstMessageOfDay: true })
  }
}
</script>
