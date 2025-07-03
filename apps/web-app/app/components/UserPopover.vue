<template>
  <UPopover
    mode="hover"
    :content="{
      align: 'center',
      side: 'bottom',
      sideOffset: 8,
    }"
  >
    <slot />

    <template v-if="user" #content>
      <div class="h-auto w-56 p-4 flex flex-col gap-2">
        <UAvatar :src="user?.avatarUrl ?? undefined" size="xl" />

        <div class="flex flex-col gap-1">
          <h4 class="text-lg font-medium leading-5">
            {{ user?.name }} {{ user?.surname }}
          </h4>

          <p class="text-sm text-muted leading-4">
            {{ user?.caption }}
          </p>
        </div>

        <template v-if="user.focusedTask">
          <TaskPopover :task="user.focusedTask">
            <div class="flex flex-row items-start gap-2 cursor-context-menu">
              <UIcon name="i-lucide-goal" class="size-5 text-secondary shrink-0 motion-preset-pulse motion-duration-2000" />
              <p class="text-sm text-secondary leading-4 line-clamp-3">
                {{ user.focusedTask.name }}
              </p>
            </div>
          </TaskPopover>
        </template>
      </div>
    </template>
  </UPopover>
</template>

<script lang="ts" setup>
import type { Task, User } from '@sushi-atrium/database'

type UserWithData = User & {
  focusedTask: Task | null
}

defineProps<{ user?: UserWithData }>()
</script>
