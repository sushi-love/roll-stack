<template>
  <ActiveCard>
    <div class="h-full flex flex-col gap-2 items-center justify-center text-center">
      <h3 class="text-xl/6 font-medium">
        {{ kitchen.address }}
      </h3>

      <h3 class="text-base text-muted">
        {{ kitchen.city }}
      </h3>
    </div>
  </ActiveCard>
</template>

<script setup lang="ts">
import type { Kitchen } from '@sushi-atrium/database'

defineProps<{ kitchen: Kitchen }>()
</script>
