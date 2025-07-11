<template>
  <div class="flex flex-col gap-1">
    <h4 class="text-lg font-medium leading-5">
      Оценки на внешних ресурсах
    </h4>

    <p class="text-sm text-muted leading-4">
      Можно нажать - ресурс откроется в новом окне
    </p>
  </div>

  <div class="mt-2 flex flex-row gap-1.5 items-center">
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
        {{ point.rating.toFixed(1) }}
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
      tooltip: 'Оценка на Яндекс Карте',
    }
  }
  if (type === '2gis_map') {
    return {
      icon: 'i-lucide-map-pin',
      color: 'text-[#19aa1e]',
      tooltip: 'Оценка 2GIS',
    }
  }
  if (type === 'vk_group') {
    return {
      icon: 'simple-icons-vk',
      color: 'text-[#0077FF]',
      tooltip: 'Оценка ВКонтакте',
    }
  }

  return {
    icon: 'i-lucide-message-circle',
    color: 'primary',
    tooltip: 'Отзывы',
  }
}
</script>
