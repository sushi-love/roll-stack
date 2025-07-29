<template>
  <Content>
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

const range = shallowRef<Range>({
  start: sub(new Date(), { days: 89 }),
  end: new Date(),
})
const period = ref<Period>('daily')
</script>
