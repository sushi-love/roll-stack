<template>
  <ActiveCard
    padding="none"
    class="flex flex-col gap-2.5 group"
  >
    <img
      :src="staff.avatarUrl ?? undefined"
      alt=""
      class="aspect-square w-full rounded-lg duration-200"
      :class="{ 'opacity-75 grayscale group-hover:grayscale-0 group-hover:opacity-100': imagesMode === 'grayscale' }"
    >

    <div class="min-h-20 h-full px-2.5 pb-2 flex flex-col gap-2.5">
      <div class="flex flex-col gap-1">
        <h3 class="text-base/5 font-bold">
          {{ staff.name }} {{ staff.surname }}
        </h3>

        <p class="text-sm/4 text-muted line-clamp-3">
          {{ staff.caption }}
        </p>
      </div>

      <template v-if="staff.focusedTask">
        <TaskPopover :task="staff.focusedTask">
          <div class="flex flex-row items-start gap-2">
            <UIcon name="i-lucide-goal" class="size-5 text-secondary shrink-0 motion-preset-pulse motion-duration-2000" />
            <p class="text-sm/4 text-secondary line-clamp-3">
              {{ staff.focusedTask.name }}
            </p>
          </div>
        </TaskPopover>
      </template>
    </div>
  </ActiveCard>
</template>

<script setup lang="ts">
import type { Task, User } from '@roll-stack/database'

type StaffWithData = User & {
  focusedTask: Task | null
}

defineProps<{
  staff: StaffWithData
}>()

const { imagesMode } = useApp()
</script>
