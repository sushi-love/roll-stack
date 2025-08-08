<template>
  <ActiveCard>
    <div class="shrink-0 w-full h-full flex flex-col gap-2 items-center justify-center text-center">
      <UIcon name="i-lucide-store" class="size-14 text-primary" />

      <h3 class="text-xl md:text-xl/6 font-semibold">
        {{ kitchen.address }}
      </h3>

      <h3 class="text-base/5">
        {{ kitchen.city }}
      </h3>
    </div>
  </ActiveCard>
</template>

<script setup lang="ts">
import type { Kitchen } from '@roll-stack/database'

defineProps<{ kitchen: Kitchen }>()
</script>
