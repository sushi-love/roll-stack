<template>
  <ActiveCard>
    <div class="h-full flex flex-col gap-2 items-center justify-center text-center">
      <h3 class="text-xl/6 font-medium">
        {{ kitchen.address }}
      </h3>

      <h3 class="text-base/5 text-muted">
        {{ kitchen.city }}
      </h3>
    </div>
  </ActiveCard>
</template>

<script setup lang="ts">
import type { Kitchen } from '@roll-stack/database'

defineProps<{ kitchen: Kitchen }>()
</script>
