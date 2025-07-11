<template>
  <div class="flex flex-col gap-1">
    <h4 class="text-lg font-medium leading-5">
      Отзывы на внешних ресурсах
    </h4>

    <p class="text-sm text-muted leading-4">
      При нажатии откроется в новом окне
    </p>
  </div>

  <div class="mt-1 flex flex-col gap-2">
    <UButton
      v-for="point in points"
      :key="point.id"
      color="neutral"
      variant="outline"
      size="md"
      :to="point.url ?? '#'"
      target="_blank"
      :icon="getDataByType(point.type)?.icon"
      :ui="{
        leadingIcon: getDataByType(point.type)?.color,
      }"
    >
      <div v-if="point.rating" class="w-full flex flex-row justify-between items-center">
        <h4>{{ getDataByType(point.type)?.tooltip }}</h4>

        <div class="shrink-0 w-fit flex flex-col items-end">
          <h4 class="text-base/5">
            {{ point.rating.toFixed(1) }}
          </h4>
          <p class="text-xs text-muted">
            {{ point.reviews }} {{ pluralizationRu(point.reviews, ['оценка', 'оценки', 'оценок']) }}
          </p>
        </div>
      </div>
    </UButton>
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
      tooltip: 'Яндекс',
    }
  }
  if (type === '2gis_map') {
    return {
      icon: 'i-lucide-map-pin',
      color: 'text-[#19aa1e]',
      tooltip: '2ГИС',
    }
  }
  if (type === 'vk_group') {
    return {
      icon: 'simple-icons-vk',
      color: 'text-[#0077FF]',
      tooltip: 'ВКонтакте',
    }
  }

  return {
    icon: 'i-lucide-message-circle',
    color: 'primary',
    tooltip: 'Отзывы',
  }
}
</script>
