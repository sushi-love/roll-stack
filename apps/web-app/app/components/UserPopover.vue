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
      <div class="h-auto w-56 p-4 flex flex-col gap-1.5">
        <div>
          <UAvatar :src="user?.avatarUrl ?? undefined" size="xl" />

          <h4 class="text-lg font-medium leading-5">
            {{ user?.name }} {{ user?.surname }}
          </h4>
        </div>

        <p class="text-sm text-muted leading-4">
          {{ user?.caption }}
        </p>
      </div>
    </template>
  </UPopover>
</template>

<script lang="ts" setup>
import type { User } from '@sushi-atrium/database'

defineProps<{ user?: User }>()
</script>
