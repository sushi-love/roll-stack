<template>
  <div ref="block" class="flex-1 py-4 sm:p-6 overflow-y-auto scroll-pt-8">
    <div class="w-full mx-auto px-2 sm:px-6 lg:px-8 max-w-2xl">
      <div
        class="w-full flex flex-col gap-2 flex-1 px-2.5 [&>article]:last-of-type:min-h-(--last-message-height) last-of-type:mb-20"
        style="--last-message-height: 0px;"
      >
        <div
          v-for="message in chat?.messages"
          :id="message.id"
          :key="message.id"
        >
          <ChatMessage
            :created-at="message.createdAt"
            :user-id="message.userId"
            :text="message.text"
            :avatar-url="members?.find((member) => member.id === message.userId)?.avatarUrl ?? undefined"
            :side="userStore.id === message.userId ? 'right' : 'left'"
            :is-first-message-of-day="messagesWithIsFirstMessageOfDay.some((item) => item.id === message.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { chatId } = defineProps<{ chatId: string }>()

const route = useRoute()
const targetId = route.query['target-id']

const userStore = useUserStore()
const chatStore = useChatStore()

const chat = computed(() => chatStore.chats.find((chat) => chat.id === chatId))
const members = computed(() => chat.value?.members.map((member) => member.user))

// show is-first-message-of-day if it's first message of day
const messagesWithIsFirstMessageOfDay = ref<{ id: string, isFirstMessageOfDay: boolean }[]>([])
const lastDay = ref<number>()

function recalculate() {
  if (!chat.value?.messages) {
    return
  }

  messagesWithIsFirstMessageOfDay.value = []

  for (const message of chat.value.messages) {
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
  targetMessageId.value = targetId as string ?? chat.value?.messages[chat.value.messages.length - 1]?.id
  scrollToMessage()
  recalculate()
})

// onUpdated(() => {
//   recalculate()
//   scrollToMessage()
// })

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
