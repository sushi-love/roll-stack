<template>
  <NuxtLink :to="`/ticket/${ticket?.id}`">
    <div
      class="p-4 sm:px-6 text-sm cursor-pointer border-l-2 transition-colors group"
      :class="[
        selectedId === ticket?.id ? 'border-secondary bg-elevated' : 'border-transparent hover:border-secondary hover:bg-elevated',
      ]"
    >
      <div class="flex flex-row items-center gap-3">
        <UAvatar :src="ticket?.user?.avatarUrl ?? undefined" alt="" />

        <div class="w-full flex items-center justify-between">
          <div class="flex flex-col gap-1">
            <p class="font-semibold leading-4 line-clamp-2">
              {{ ticket?.title }}
            </p>

            <p class="text-dimmed line-clamp-1">
              {{ ticket?.lastMessage?.text }}
            </p>
          </div>

          <span class="text-sm text-dimmed shrink-0">
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

const { id } = defineProps<{ id: string }>()

const { selectedId } = useTicket()

const ticketStore = useTicketStore()

const ticket = computed(() => ticketStore.find(id))

const lastMessageDate = computed<string>(() => {
  if (!ticket.value?.lastMessage?.createdAt) {
    return ''
  }

  return isToday(new Date(ticket.value.lastMessage.createdAt)) ? format(new Date(ticket.value.lastMessage.createdAt), 'HH:mm', { locale: ru }) : format(new Date(ticket.value.lastMessage.createdAt), 'dd MMM', { locale: ru })
})
</script>
