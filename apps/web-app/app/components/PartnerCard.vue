<template>
  <ActiveCard padding="xs" class="flex flex-col gap-2 group">
    <img
      :src="user.avatarUrl ?? undefined"
      alt=""
      class="aspect-square w-full rounded-lg duration-200"
      :class="{ 'opacity-75 grayscale group-hover:grayscale-0 group-hover:opacity-100': imagesMode === 'grayscale' }"
    >

    <div class="flex flex-row items-center gap-1.5">
      <PartnerPrestigeBadge
        :prestige="user.prestige"
        size="sm"
        class="group-hover:scale-125 duration-200"
      />

      <h3 class="text-lg font-semibold leading-5">
        {{ user.name }} {{ user.surname }}
      </h3>
    </div>

    <p class="text-sm text-muted leading-4 line-clamp-3">
      {{ user.caption }}
    </p>
  </ActiveCard>
</template>

<script setup lang="ts">
import type { User } from '@sushi-atrium/database'

defineProps<{
  user: User
}>()

const { imagesMode } = useApp()
</script>
