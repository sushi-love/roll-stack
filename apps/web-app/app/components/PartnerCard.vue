<template>
  <ActiveCard padding="none" class="flex flex-col gap-2.5 group">
    <img
      :src="partner.avatarUrl ?? undefined"
      alt=""
      class="aspect-square w-full rounded-lg duration-200"
      :class="{ 'opacity-75 grayscale group-hover:grayscale-0 group-hover:opacity-100': imagesMode === 'grayscale' }"
    >

    <div class="min-h-20 h-full px-2.5 pb-2 flex flex-col gap-2.5">
      <div class="flex flex-row items-center gap-2">
        <UBadge
          color="neutral"
          variant="outline"
          size="xl"
        >
          {{ partner.priceLevel }}
        </UBadge>

        <h3 class="text-base/5 font-bold">
          {{ partner.name }} {{ partner.surname }}
        </h3>
      </div>

      <p class="text-sm/4 text-muted line-clamp-3">
        {{ partner.legal }}
      </p>

      <p class="text-sm/4 text-muted line-clamp-3">
        {{ partner.city }}
      </p>
    </div>
  </ActiveCard>
</template>

<script setup lang="ts">
import type { Partner } from '@roll-stack/database'

defineProps<{
  partner: Partner
}>()

const { imagesMode } = useApp()
</script>
