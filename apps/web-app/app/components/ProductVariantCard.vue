<template>
  <ActiveCard class="flex flex-col gap-2 justify-center items-center text-center">
    <div class="mb-2 flex gap-2">
      <UBadge
        v-for="tag in variant.tags"
        :key="tag.id"
        color="neutral"
        variant="outline"
        :label="tag.name"
      />
    </div>

    <div class="text-lg font-medium md:leading-tight">
      {{ variant.name }}
    </div>

    <div class="flex flex-row flex-nowrap gap-6 items-center justify-center">
      <div class="text-muted">
        {{ new Intl.NumberFormat(locale).format(variant.gross) }} {{ menu.currencySign }}
      </div>
      <div class="text-muted">
        {{ variant.weightValue }}{{ getWeightLocalizedUnit(variant.weightUnit) }}
      </div>
    </div>

    <div class="flex flex-row gap-3 justify-center text-muted text-sm">
      <div v-if="variant.calories != null">
        {{ variant.calories }}{{ $t('common.abbreviation.kcal') }}
      </div>
      <div v-if="variant.protein != null">
        {{ variant.protein }}{{ $t('common.abbreviation.g') }}
      </div>
      <div v-if="variant.fat != null">
        {{ variant.fat }}{{ $t('common.abbreviation.g') }}
      </div>
      <div v-if="variant.carbohydrate != null">
        {{ variant.carbohydrate }}{{ $t('common.abbreviation.g') }}
      </div>
    </div>
  </ActiveCard>
</template>

<script setup lang="ts">
import { UBadge } from '#components'

defineProps<{ variant: ProductVariantWithData }>()

const { locale } = useI18n()
const menu = useMenuStore()
</script>
