<template>
  <div class="flex flex-row gap-1.5 items-center">
    <UTooltip
      v-for="point in points"
      :key="point.id"
      :text="getDataByType(point.type)?.tooltip"
    >
      <UButton
        v-if="point.rating"
        color="neutral"
        variant="outline"
        :to="point.url ?? '#'"
        target="_blank"
        :icon="getDataByType(point.type)?.icon"
        :ui="{
          leadingIcon: getDataByType(point.type)?.color,
          base: 'font-semibold',
        }"
      >
        <p
          :class="[
            point.rating >= 4 && 'text-neutral',
            point.rating < 4 && point.rating >= 3 && 'text-orange-500',
            point.rating < 3 && 'text-red-500',
          ]"
        >
          {{ point.rating.toFixed(1) }}
        </p>
      </UButton>
    </UTooltip>
  </div>
</template>

<script setup lang="ts">
import type { FeedbackPoint } from '@sushi-atrium/database'

defineProps<{ points: FeedbackPoint[] }>()

function getDataByType(type: string) {
  if (type === 'yandex_map') {
    return {
      icon: 'i-lucide-map-pin',
      color: 'text-[#f43]',
      tooltip: 'Рейтинг на Яндекс Карте',
    }
  }

  return {
    icon: 'i-lucide-message-circle',
    color: 'primary',
    tooltip: 'Отзывы',
  }
}
</script>
