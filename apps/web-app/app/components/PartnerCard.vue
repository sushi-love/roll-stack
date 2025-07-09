<template>
  <ActiveCard padding="xs" class="flex flex-col gap-2 group">
    <img
      :src="partner.avatarUrl ?? undefined"
      alt=""
      class="aspect-square w-full rounded-lg duration-200"
      :class="{ 'opacity-75 grayscale group-hover:grayscale-0 group-hover:opacity-100': imagesMode === 'grayscale' }"
    >

    <div class="flex flex-row items-center gap-1.5">
      <PartnerPrestigeBadge
        :prestige="partner.prestige"
        size="sm"
        class="group-hover:scale-125 duration-200"
      />

      <h3 class="text-base/5 font-bold">
        {{ partner.name }} {{ partner.surname }}
      </h3>
    </div>

    <p class="text-sm text-muted leading-4 line-clamp-3">
      {{ partner.city }}
    </p>
  </ActiveCard>
</template>

<script setup lang="ts">
import type { Partner } from '@sushi-atrium/database'

defineProps<{
  partner: Partner
}>()

const { imagesMode } = useApp()
</script>
