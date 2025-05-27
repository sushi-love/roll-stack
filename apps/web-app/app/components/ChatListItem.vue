<template>
  <NuxtLink :to="`/chat/${chat?.id}`">
    <div
      class="p-4 sm:px-6 text-sm cursor-pointer border-l-2 transition-colors group"
      :class="[
        //chat?.unread ? 'text-highlighted' : 'text-toned',
        selectedChatId === chat?.id ? 'border-secondary bg-elevated' : 'border-transparent hover:border-secondary hover:bg-elevated',
      ]"
    >
      <div class="flex flex-row items-center gap-3">
        <UAvatarGroup :max="3" size="lg">
          <UAvatar
            v-for="otherUser in otherUsers"
            :key="otherUser.id"
            :src="otherUser?.user.avatarUrl ?? undefined"
            alt=""
            :class="{ 'opacity-75 grayscale group-hover:grayscale-0 group-hover:opacity-100': imagesMode === 'grayscale' }"
          />
        </UAvatarGroup>

        <div
          class="w-full flex items-center justify-between"
          :class="[
            //chat?.unread && 'font-semibold'
          ]"
        >
          <div class="flex flex-col gap-1">
            <p class="font-semibold leading-4 line-clamp-2">
              {{ chat?.name }}
            </p>

            <!-- <UChip v-if="chat?.unread" /> -->

            <p class="text-dimmed line-clamp-1">
              {{ chat?.lastMessage?.text }}
            </p>
          </div>

          <span class="text-sm text-dimmed">
            {{ lastMessageDate }}
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { format, isToday } from 'date-fns'
import { ru } from 'date-fns/locale/ru'

const { chatId } = defineProps<{ chatId: string }>()

const { selectedChatId } = useChat()
const { imagesMode } = useApp()

const user = useUserStore()

const chatStore = useChatStore()
const chat = computed(() => chatStore.find(chatId))

const otherUsers = computed(() => chat.value?.members.filter((member) => member.userId !== user.id))

const lastMessageDate = computed<string>(() => {
  if (!chat.value?.lastMessage?.createdAt) {
    return ''
  }

  return isToday(new Date(chat.value.lastMessage.createdAt)) ? format(new Date(chat.value.lastMessage.createdAt), 'HH:mm', { locale: ru }) : format(new Date(chat.value.lastMessage.createdAt), 'dd MMM', { locale: ru })
})
</script>
