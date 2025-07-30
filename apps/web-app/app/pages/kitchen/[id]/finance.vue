<template>
  <Content>
    <div>
      <DateRangePicker v-model="range" />
    </div>

    <ChartKitchenRevenue
      :period="period"
      :range="range"
      :values="data ?? []"
    />

    <ChartKitchenChecks
      :period="period"
      :range="range"
      :values="data ?? []"
    />
  </Content>
</template>

<script setup lang="ts">
import type { Period, Range } from '#shared/types'
import { sub } from 'date-fns'

const { params } = useRoute('kitchen-id')

const { data } = useFetch(`/api/kitchen/id/${params.id}/revenue`)

const today = new Date()
const range = shallowRef<Range>({
  start: sub(today, { days: 14 - 1 }),
  end: today,
})
const period = ref<Period>('daily')
</script>
