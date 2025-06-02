<template>
  <div class="h-16 shrink-0 flex items-center justify-between border-b border-default px-4 sm:px-6 gap-1.5">
    <div class="flex items-center gap-4 sm:my-1.5">
      <UAvatarGroup
        :max="3"
        size="lg"
        :ui="{
          base: '-me-2.5',
        }"
      >
        <UAvatar
          v-for="member in activeMembers"
          :key="member.id"
          :src="member.user.avatarUrl ?? undefined"
          alt=""
        />
      </UAvatarGroup>

      <div class="min-w-0">
        <p class="text-sm font-semibold text-highlighted leading-5">
          {{ chat?.name }}
        </p>
        <p class="text-muted text-xs">
          {{ chat?.description ?? 'Общий чат' }}
        </p>
      </div>
    </div>

    <UNavigationMenu
      :items="items"
      variant="link"
      color="secondary"
      :highlight="false"
    />
  </div>

  <NuxtPage />
</template>

<script setup lang="ts">
const { params } = useRoute('chat-chatId')

const chatStore = useChatStore()

const chat = computed(() => chatStore.chats.find((chat) => chat.id === params.chatId))
const activeMembers = computed(() => chat.value?.members.filter((member) => member.user.type !== 'bot'))

const items = ref([
  {
    label: 'Чат',
    to: `/chat/${params.chatId}`,
    icon: 'i-lucide-message-square-text',
    exact: true,
  }, {
    label: 'Задачи',
    to: `/chat/${params.chatId}/tasks`,
    icon: 'i-lucide-book-check',
  },
])
</script>
