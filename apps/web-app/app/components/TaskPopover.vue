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

    <template v-if="task" #content>
      <div class="h-auto w-72 p-4 flex flex-col gap-1.5">
        <p class="text-sm font-medium text-secondary leading-4">
          Задача в фокусе
        </p>

        <h4 class="text-lg font-medium leading-5">
          {{ task?.name }}
        </h4>

        <p class="text-sm text-muted leading-4">
          {{ task?.description }}
        </p>
      </div>
    </template>
  </UPopover>
</template>

<script lang="ts" setup>
import type { Task } from '@roll-stack/database'

defineProps<{ task?: Task }>()
</script>
