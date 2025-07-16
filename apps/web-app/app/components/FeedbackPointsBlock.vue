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
      :icon="getFeedbackPointDataByType(point.type)?.icon"
      :ui="{
        leadingIcon: getFeedbackPointDataByType(point.type)?.color,
      }"
    >
      <div class="w-full flex flex-row justify-between items-center">
        <h4>{{ getFeedbackPointDataByType(point.type)?.tooltip }}</h4>

        <div class="shrink-0 w-fit flex flex-col items-end">
          <h4 class="text-base/4">
            {{ point.rating.toFixed(1) }}
          </h4>
          <p class="text-xs text-muted">
            {{ point.ratings }} {{ pluralizationRu(point.ratings, ['оценка', 'оценки', 'оценок']) }}
          </p>
        </div>
      </div>
    </UButton>
  </div>
</template>

<script setup lang="ts">
import type { FeedbackPoint } from '@sushi-atrium/database'

defineProps<{ points: FeedbackPoint[] }>()
</script>
