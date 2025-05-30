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
        <UserPopover :user="user">
          <UAvatar :src="avatarUrl" class="hover:scale-110 duration-200" />
        </UserPopover>
      </div>

      <div
        class="min-h-12 min-w-18 relative bg-elevated/50 px-3.5 py-2 rounded-lg"
        :class="[
          side === 'left' && 'text-neutral-900 bg-orange-100 dark:bg-orange-200 border-b-2 border-l-2 border-orange-200 dark:border-orange-300',
          isBot && '!w-full !text-neutral-900 !bg-transparent !border-transparent !border-0',
        ]"
      >
        <div
          class="text-base/6 font-medium whitespace-break-spaces text-pretty"
          :class="[
            side === 'left' && 'font-semibold',
            isBot && '!font-medium !text-muted !text-sm/5',
          ]"
        >
          {{ text }}
        </div>

        <div
          class="mt-0.5 flex justify-end text-xs text-dimmed"
          :class="[
            side === 'left' && 'text-neutral-600',
            isBot && '!text-dimmed !justify-start !bg-elevated/50 !rounded-lg !mt-1 !px-1.5 !py-1 !w-fit',
          ]"
        >
          {{ format(new Date(createdAt), 'HH:mm') }}
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { format, isToday } from 'date-fns'
import { ru } from 'date-fns/locale/ru'

const { userId, isFirstMessageOfDay = false } = defineProps<{
  createdAt: string
  text: string | null
  avatarUrl?: string
  userId: string
  side: 'left' | 'right'
  isFirstMessageOfDay?: boolean
}>()

const userStore = useUserStore()
const user = computed(() => userStore.find(userId))

const isBot = computed(() => !user.value?.type)
</script>
