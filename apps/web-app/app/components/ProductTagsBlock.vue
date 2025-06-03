<template>
  <div class="flex flex-row gap-1.5">
    <UBadge
      v-for="tag in tags"
      :key="tag.id"
      color="neutral"
      variant="outline"
      :label="tag.productTag.name"
    />
  </div>
</template>

<script setup lang="ts">
import type { ProductWithData } from '~~/types'

defineProps<{ tags: ProductWithData['tags'] }>()
</script>
