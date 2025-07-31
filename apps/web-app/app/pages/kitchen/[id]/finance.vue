<template>
  <Content>
    <div>
      <DateRangePicker v-model="range" />
    </div>

    <ChartKitchenRevenue
      :period="period"
      :range="range"
      :values="revenues ?? []"
      :metrics="metrics ?? []"
    />

    <ChartKitchenChecks
      :period="period"
      :range="range"
      :values="revenues ?? []"
      :metrics="metrics ?? []"
    />
  </Content>
</template>

<script setup lang="ts">
import type { Period, Range } from '#shared/types'
import { sub } from 'date-fns'

const { params } = useRoute('kitchen-id')

const { data: revenues } = useFetch(`/api/kitchen/id/${params.id}/revenue`)
const { data: metrics } = useFetch('/api/network/metrics')

const today = new Date()
const range = shallowRef<Range>({
  start: sub(today, { days: 30 - 1 }),
  end: today,
})
const period = ref<Period>('daily')
</script>
