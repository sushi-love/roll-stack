<template>
  <div ref="block" class="flex-1 p-4 sm:p-6 overflow-y-auto scroll-pt-8">
    <UContainer class="max-w-2xl">
      <div
        class="w-full flex flex-col gap-2 flex-1 px-2.5 [&>article]:last-of-type:min-h-(--last-message-height) last-of-type:mb-20"
        style="--last-message-height: 0px;"
      >
        <div
          v-for="message in messages"
          :id="message.id"
          :key="message.id"
        >
          <ChatMessage
            :created-at="message.createdAt"
            :user-id="message.userId"
            :text="message.text"
            :avatar-url="members.find((member) => member.id === message.userId)?.avatarUrl ?? undefined"
            :side="userStore.id === message.userId ? 'right' : 'left'"
            :is-first-message-of-day="messagesWithIsFirstMessageOfDay.some((item) => item.id === message.id)"
          />
        </div>
      </div>
    </UContainer>
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

const { messages } = defineProps<{ messages: Message[], members: User[] }>()

const route = useRoute()
const targetId = route.query['target-id']

const userStore = useUserStore()

// show is-first-message-of-day if it's first message of day
const messagesWithIsFirstMessageOfDay = ref<{ id: string, isFirstMessageOfDay: boolean }[]>([])
const lastDay = ref<number>()

function recalculate() {
  for (const message of messages) {
    const day = new Date(message.createdAt).getDate()
    if (lastDay.value !== day) {
      lastDay.value = day
      messagesWithIsFirstMessageOfDay.value.push({ id: message.id, isFirstMessageOfDay: true })
    }
  }
}

const targetMessageId = ref<string | undefined>()
const block = useTemplateRef<HTMLDivElement>('block')

const { arrivedState } = useScroll(block, { behavior: 'smooth' })

onMounted(() => {
  targetMessageId.value = targetId as string ?? messages[messages.length - 1]?.id
  scrollToMessage()

  recalculate()
})

onUpdated(() => {
  recalculate()

  scrollToMessage()
})

function scrollToMessage() {
  const message = window.document.getElementById(targetMessageId.value ?? 'none')

  if (message) {
    message.scrollIntoView({ behavior: 'smooth' })

    setTimeout(() => {
      if (!arrivedState.bottom) {
        message.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }
}
</script>
