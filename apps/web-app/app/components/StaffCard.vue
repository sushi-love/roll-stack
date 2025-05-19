<template>
  <ActiveCard padding="xs" class="flex flex-col gap-2 group">
    <img
      :src="user.avatar ?? undefined"
      alt=""
      class="aspect-square w-full rounded-lg duration-200"
      :class="{ 'opacity-75 grayscale group-hover:grayscale-0 group-hover:opacity-100': imagesMode === 'grayscale' }"
    >

    <div class="flex flex-row items-center gap-1.5">
      <h3 class="text-lg font-semibold leading-5">
        {{ user.name }} {{ user.surname }}
      </h3>
    </div>

    <p class="text-sm text-muted">
      Название ...
    </p>
  </ActiveCard>
</template>

<script setup lang="ts">
import type { User } from '~~/types'

defineProps<{
  user: User
}>()

const { imagesMode } = useApp()
</script>
