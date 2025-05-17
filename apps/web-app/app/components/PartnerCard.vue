<template>
  <ActiveCard padding="xs" class="flex flex-col gap-2 group">
    <div class="relative w-full h-full">
      <img
        :src="user.avatar ?? undefined"
        alt=""
        class="aspect-square w-full rounded-lg"
      >

      <div class="absolute top-1 right-1 group-hover:scale-110 duration-200">
        <PartnerScoreBadge :score="user.score" size="md" />
      </div>
    </div>

    <div class="flex flex-col gap-0.5 text-center">
      <p class="text-lg font-semibold leading-5">
        {{ user.name }} {{ user.surname }}
      </p>
      <p class="text-sm text-muted">
        Название ...
      </p>
    </div>
  </ActiveCard>
</template>

<script setup lang="ts">
import type { User } from '~~/types'

defineProps<{
  user: User
}>()
</script>
