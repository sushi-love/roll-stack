<template>
  <Header :title="t('app.network.metrics')" />

  <Content>
    <div class="flex flex-row gap-3.5 items-center">
      <DateRangePicker v-model="range" />
      <PeriodSelect v-model="period" :range="range" />
    </div>

    <ChartNetworkRevenue
      :period="period"
      :range="range"
      :values="metrics ?? []"
    />

    <ChartNetworkChecks
      :period="period"
      :range="range"
      :values="metrics ?? []"
    />
  </Content>
</template>

<script setup lang="ts">
import type { Period, Range } from '#shared/types'
import { sub } from 'date-fns'

const { t } = useI18n()

const { data: metrics } = useFetch('/api/network/metrics')

const today = new Date()
const range = shallowRef<Range>({
  start: sub(today, { days: 30 - 1 }),
  end: today,
})
const period = ref<Period>('daily')

useHead({
  title: t('app.network.metrics'),
})
</script>
