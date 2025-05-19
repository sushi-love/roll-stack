<template>
  <div class="h-16 shrink-0 flex items-center justify-between border-b border-default px-4 sm:px-6 gap-1.5">
    <!-- <div class="flex items-start gap-4 sm:my-1.5">
      <UAvatar
        v-bind="mail.from.avatar"
        :alt="mail.from.name"
        size="2xl"
      />

      <div class="min-w-0">
        <p class="font-semibold text-highlighted">
          {{ mail.from.name }}
        </p>
        <p class="text-muted">
          {{ mail.from.email }}
        </p>
      </div>
    </div>

    <p class="max-sm:pl-16 text-muted text-sm sm:mt-2">
      {{ format(new Date(mail.date), 'dd MMM HH:mm') }}
    </p> -->
  </div>

  <div class="flex-1 p-4 sm:p-6 overflow-y-auto">
    <p class="whitespace-pre-wrap">
      {{ chat?.members }}
    </p>
  </div>

  <div class="pb-4 px-4 sm:px-6 shrink-0">
    <FormCreateChatMessage />
  </div>
</template>

<script setup lang="ts">
const { chatId } = defineProps<{
  chatId: string
}>()

const { data } = await useFetch('/api/chat', { default: () => [] })

const chat = computed(() => data.value.find((chat) => chat.id === chatId))
</script>
