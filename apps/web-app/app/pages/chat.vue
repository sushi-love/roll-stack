<template>
  <div class="h-svh grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
    <div class="col-span-1 relative flex flex-col min-w-0 min-h-svh lg:not-last:border-r lg:not-last:border-default shrink-0 w-full">
      <div class="h-16 shrink-0 flex items-center justify-between border-b border-default px-4 sm:px-6 gap-1.5">
        <h1 class="flex items-center gap-1.5 font-normal text-lg text-highlighted truncate">
          {{ $t('app.menu.chats') }}
        </h1>
      </div>

      <div class="overflow-y-auto divide-y divide-default">
        <div v-for="chat in data" :key="chat.id">
          <NuxtLink :to="`/chat/${chat.id}`">
            <div
              class="p-4 sm:px-6 text-sm cursor-pointer border-l-3 transition-colors group"
              :class="[
                //chat?.unread ? 'text-highlighted' : 'text-toned',
                selectedChatId === chat.id ? 'border-secondary bg-elevated' : 'border-transparent hover:border-secondary hover:bg-elevated',
              ]"
            >
              <div class="flex flex-row items-center gap-3">
                <UAvatar
                  :src="chat.members[0]?.avatar ?? undefined"
                  alt=""
                  class="size-10"
                  :class="{ 'opacity-75 grayscale group-hover:grayscale-0 group-hover:opacity-100': imagesMode === 'grayscale' }"
                />

                <div class="w-full">
                  <div
                    class="flex items-center justify-between"
                    :class="[
                      //chat?.unread && 'font-semibold'
                    ]"
                  >
                    <div class="flex items-center gap-3">
                      <p class="text-md font-semibold">
                        {{ chat?.members[0]?.name }} {{ chat?.members[0]?.surname }}
                      </p>

                      <!-- <UChip v-if="chat?.unread" /> -->
                    </div>

                    <span class="text-sm text-dimmed">{{ isToday(new Date(chat?.createdAt)) ? format(new Date(chat?.createdAt), 'HH:mm') : format(new Date(chat?.createdAt), 'dd MMM') }}</span>
                  </div>
                  <p
                    class="text-dimmed line-clamp-1"
                    :class="[
                    // chat?.unread && 'font-semibold'
                    ]"
                  >
                    Сообщение
                  </p>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
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
import type { Chat } from '~~/types'
import { breakpointsTailwind } from '@vueuse/core'
import { format, isToday } from 'date-fns'
import { computed, ref } from 'vue'

const { data } = await useFetch('/api/chat', { default: () => [] })

const { imagesMode } = useApp()
const { selectedChatId } = useChat()

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
