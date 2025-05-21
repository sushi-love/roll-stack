<template>
  <div v-if="isFirstMessageOfDay" class="mt-6.5 mb-2.5 w-full flex flex-row items-center justify-center">
    <UBadge color="neutral" variant="soft">
      {{ isToday(new Date(createdAt)) ? 'Сегодня, ' : '' }}
      {{ format(new Date(createdAt), 'dd MMM', { locale: ru }) }}
    </UBadge>
  </div>

  <article class="group/message relative w-full scroll-mt-4 sm:scroll-mt-6">
    <div class="relative flex items-start gap-2 pb-2" :class="{ 'ms-auto max-w-[75%] ltr:justify-end': side === 'right', 'rtl:justify-end': side === 'left' }">
      <div class="inline-flex items-center justify-center min-h-6 mt-1.5">
        <UAvatar :src="avatarUrl" />
      </div>

      <div class="min-h-12 min-w-18 relative bg-elevated/50 px-3.5 py-2 rounded-lg" :class="{ 'text-neutral-900 bg-orange-100 border-b-2 border-l-2 border-orange-200': side === 'left' }">
        <div class="text-pretty leading-6 font-medium" :class="{ 'font-semibold': side === 'left' }">
          {{ text }}
        </div>

        <div class="pt-0.5 flex justify-end text-xs text-dimmed" :class="{ 'text-muted': side === 'left' }">
          {{ format(new Date(createdAt), 'HH:mm') }}
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { format, isToday } from 'date-fns'
import { ru } from 'date-fns/locale/ru'

const { isFirstMessageOfDay = false } = defineProps<{
  createdAt: string
  text: string | null
  avatarUrl?: string
  userId: string
  side: 'left' | 'right'
  isFirstMessageOfDay?: boolean
}>()
</script>
