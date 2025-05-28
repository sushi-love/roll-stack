<template>
  <div class="h-16 shrink-0 flex items-center justify-between border-b border-default px-4 sm:px-6 gap-1.5">
    <div class="flex items-center gap-4 sm:my-1.5">
      <UAvatarGroup :max="3" size="lg">
        <UAvatar
          v-for="member in data?.members"
          :key="member.id"
          :src="member.user.avatarUrl ?? undefined"
          alt=""
        />
      </UAvatarGroup>

      <div class="min-w-0">
        <p class="text-sm font-semibold text-highlighted leading-5">
          {{ data?.name }}
        </p>
        <p class="text-muted text-xs">
          {{ data?.description ?? 'Общий чат' }}
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

const { data } = await useFetch(`/api/chat/id/${params.chatId}`)

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
