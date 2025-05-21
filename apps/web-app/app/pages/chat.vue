<template>
  <div class="h-svh grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
    <div class="col-span-1 relative flex flex-col min-w-0 min-h-svh lg:not-last:border-r lg:not-last:border-default shrink-0 w-full">
      <div class="h-16 shrink-0 flex items-center justify-between border-b border-default px-4 sm:px-6 gap-1.5">
        <h1 class="flex items-center gap-1.5 font-normal text-lg text-highlighted truncate">
          {{ $t('app.menu.chats') }}
        </h1>
      </div>

      <div class="overflow-y-auto divide-y divide-default">
        <ChatListItem
          v-for="chat in data"
          :key="chat.id"
          :chat="chat"
          :members="chat.members.map((m) => m.user)"
          :last-message="chat.lastMessage"
        />
      </div>
    </div>

    <div class="col-span-2 relative flex flex-col min-w-0 min-h-svh lg:not-last:border-r lg:not-last:border-default flex-1">
      <NuxtPage />
    </div>
  </div>

  <ClientOnly>
    <USlideover v-if="isMobile" v-model:open="isMailPanelOpen">
      <template #content>
        <!-- <ChatBlock
          v-if="selectedMail"
          :chat="selectedMail"
          @close="selectedMail = null"
        /> -->
      </template>
    </USlideover>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { Chat } from '@sushi-atrium/database'
import { breakpointsTailwind } from '@vueuse/core'
import { computed, ref } from 'vue'
import ChatListItem from '~/components/ChatListItem.vue'

const { data } = await useFetch('/api/chat/my', { default: () => [] })

const selectedMail = ref<Chat | null>()

const isMailPanelOpen = computed({
  get() {
    return !!selectedMail.value
  },
  set(value: boolean) {
    if (!value) {
      selectedMail.value = null
    }
  },
})

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('lg')
</script>
