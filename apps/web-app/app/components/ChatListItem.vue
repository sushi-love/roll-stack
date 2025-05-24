<template>
  <NuxtLink :to="`/chat/${chat.id}`">
    <div
      class="p-4 sm:px-6 text-sm cursor-pointer border-l-2 transition-colors group"
      :class="[
        //chat?.unread ? 'text-highlighted' : 'text-toned',
        selectedChatId === chat.id ? 'border-secondary bg-elevated' : 'border-transparent hover:border-secondary hover:bg-elevated',
      ]"
    >
      <div class="flex flex-row items-center gap-3">
        <UAvatarGroup :max="3" size="lg">
          <UAvatar
            v-for="otherUser in otherUsers"
            :key="otherUser.id"
            :src="otherUser.avatarUrl ?? undefined"
            alt=""
            :class="{ 'opacity-75 grayscale group-hover:grayscale-0 group-hover:opacity-100': imagesMode === 'grayscale' }"
          />
        </UAvatarGroup>

        <div class="w-full">
          <div
            class="flex items-center justify-between"
            :class="[
              //chat?.unread && 'font-semibold'
            ]"
          >
            <div class="flex items-center gap-3">
              <p class="text-md font-semibold">
                {{ chat.name }}
              </p>

              <!-- <UChip v-if="chat?.unread" /> -->
            </div>

            <span class="text-sm text-dimmed">
              {{ lastMessageDate }}
            </span>
          </div>
          <p
            class="text-dimmed line-clamp-1"
            :class="[
              // chat?.unread && 'font-semibold'
            ]"
          >
            {{ lastMessage?.text }}
          </p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Chat, ChatMessage, User } from '@sushi-atrium/database'
import { format, isToday } from 'date-fns'
import { ru } from 'date-fns/locale/ru'

const { members, chat, lastMessage } = defineProps<{ chat: Chat, members: User[], lastMessage: ChatMessage | null }>()

const { selectedChatId } = useChat()
const { imagesMode } = useApp()

const user = useUserStore()

const otherUsers = computed(() => members.filter((member) => member.id !== user.id))

const lastMessageDate = computed<string>(() => {
  if (!lastMessage?.createdAt) {
    return ''
  }

  return isToday(new Date(lastMessage.createdAt)) ? format(new Date(lastMessage.createdAt), 'HH:mm', { locale: ru }) : format(new Date(lastMessage.createdAt), 'dd MMM', { locale: ru })
})
</script>
