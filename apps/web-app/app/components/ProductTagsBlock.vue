<template>
  <div class="flex flex-row gap-1.5">
    <UBadge
      v-for="tag in tags"
      :key="tag.id"
      color="neutral"
      variant="outline"
      size="sm"
      :label="tag.name"
    />
  </div>
</template>

<script setup lang="ts">
import type { ProductTag } from '@sushi-atrium/database'

defineProps<{ tags: ProductTag[] }>()
</script>
