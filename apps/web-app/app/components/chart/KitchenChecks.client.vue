<template>
  <UCard ref="cardRef" :ui="{ root: 'overflow-visible', body: '!px-0 !pt-0 !pb-3' }">
    <template #header>
      <div>
        <p class="text-xs text-muted uppercase mb-1.5">
          Средний чек за {{ data.length }} {{ pluralizationRu(data.length, ['день', 'дня', 'дней']) }}
        </p>
        <p class="text-3xl text-highlighted font-semibold">
          {{ formatNumber(total) }}
        </p>
      </div>
    </template>

    <VisXYContainer
      :data="data"
      :padding="{ top: 40 }"
      :width="width"
      class="h-72"
    >
      <VisLine
        :x="x"
        :y="y"
        :color="color"
        :line-dash-array="lineDashArray"
      />
      <VisArea
        :x="x"
        :y="yArea"
        color="var(--ui-info)"
        :opacity="0.1"
      />

      <VisAxis
        type="x"
        :x="x"
        :tick-format="xTicks"
      />

      <VisCrosshair
        color="var(--ui-info)"
        :template="template"
      />

      <VisTooltip />
    </VisXYContainer>
  </UCard>
</template>

<script setup lang="ts">
import type { Period, Range } from '#shared/types'
import { VisArea, VisAxis, VisCrosshair, VisLine, VisTooltip, VisXYContainer } from '@unovis/vue'
import { eachDayOfInterval, eachMonthOfInterval, eachWeekOfInterval, format } from 'date-fns'
import { ru } from 'date-fns/locale'

type DataRecord = {
  date: Date
  checks: number
  averageCheck: number
  commonAverageCheck: number
}

const { period, range, values, metrics } = defineProps<{
  period: Period
  range: Range
  values: { date: string, checks: number, averageCheck: number }[]
  metrics: { date: string, checks: number, averageCheck: number, total: number, averageTotal: number }[]
}>()

const cardRef = useTemplateRef<HTMLElement | null>('cardRef')

const { width } = useElementSize(cardRef)

const data = ref<DataRecord[]>([])

watch([() => period, () => range, () => values, () => metrics], () => {
  const dates = ({
    daily: eachDayOfInterval,
    weekly: eachWeekOfInterval,
    monthly: eachMonthOfInterval,
  } as Record<Period, typeof eachDayOfInterval>)[period](range)

  data.value = dates.map((date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    const value = values.find((d) => d.date.startsWith(dateStr))
    const metric = metrics.find((d) => d.date.startsWith(dateStr))

    return {
      date,
      checks: value?.checks ?? 0,
      averageCheck: value?.averageCheck ?? 0,
      commonAverageCheck: metric?.averageCheck ?? 0,
    }
  })
}, { immediate: true })

const x = (_: DataRecord, i: number) => i
const y = [
  (d: DataRecord) => d.averageCheck,
  (d: DataRecord) => d.commonAverageCheck,
]
const yArea = (d: DataRecord) => d.averageCheck

const color = (_: DataRecord, i: number) => ['var(--ui-info)', 'var(--ui-info)'][i]
const lineDashArray = (_: DataRecord, i: number) => [i === 0 ? undefined : 3]

const total = computed(() => {
  const count = data.value.filter((d) => d.averageCheck).length
  const avg = data.value.reduce((acc: number, { averageCheck }) => acc + averageCheck, 0)
  return avg > 0 && count > 0 ? Math.floor(avg / count) : 0
})

const formatNumber = new Intl.NumberFormat('ru', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format

function formatDate(date: Date): string {
  return ({
    daily: format(date, 'd MMMM', { locale: ru }),
    weekly: format(date, 'd MMMM', { locale: ru }),
    monthly: format(date, 'MMMM yyy', { locale: ru }),
  })[period]
}

function xTicks(i: number) {
  if (i === 0 || i === data.value.length - 1 || !data.value[i]) {
    return ''
  }

  return formatDate(data.value[i].date)
}

const template = (d: DataRecord) => `<strong>${formatDate(d.date)}, ${format(d.date, 'eeee', { locale: ru })}</strong><br> ${d.checks} ${pluralizationRu(d.checks, ['чек', 'чека', 'чеков'])}, средний ${formatNumber(d.averageCheck)}<br> Средний по сети: ${formatNumber(d.commonAverageCheck)}`
</script>

<style scoped>
.unovis-xy-container {
  --vis-crosshair-line-stroke-color: var(--ui-info);
  --vis-crosshair-circle-stroke-color: var(--ui-bg);

  --vis-axis-grid-color: var(--ui-border);
  --vis-axis-tick-color: var(--ui-border);
  --vis-axis-tick-label-color: var(--ui-text-dimmed);

  --vis-tooltip-background-color: var(--ui-bg);
  --vis-tooltip-border-color: var(--ui-border);
  --vis-tooltip-text-color: var(--ui-text-highlighted);
}
</style>
