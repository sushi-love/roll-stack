<template>
  <USelect
    v-model="model"
    :items="periods"
    variant="outline"
    size="lg"
    class="min-w-32 data-[state=open]:bg-elevated"
    :ui="{ trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }"
  />
</template>

<script setup lang="ts">
import type { Period, Range } from '#shared/types'
import { eachDayOfInterval } from 'date-fns'

const props = defineProps<{
  range: Range
}>()

const model = defineModel<Period>({ required: true })

const days = computed(() => eachDayOfInterval(props.range))

const periods = computed<{ label: string, value: Period }[]>(() => {
  if (days.value.length <= 14) {
    return [
      {
        label: 'По дням',
        value: 'daily',
      },
    ]
  }

  if (days.value.length <= 90) {
    return [
      {
        label: 'По дням',
        value: 'daily',
      },
      {
        label: 'По неделям',
        value: 'weekly',
      },
    ]
  }

  return [
    {
      label: 'По неделям',
      value: 'weekly',
    },
    // {
    //   label: 'По месяцам',
    //   value: 'monthly'
    // }
  ]
})

// Ensure the model value is always a valid period
watch(periods, () => {
  if (!periods.value.some((p) => p.value === model.value) && periods.value[0]?.value) {
    model.value = periods.value[0]?.value
  }
})
</script>
