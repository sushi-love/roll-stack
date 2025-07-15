<template>
  <Content>
    <div class="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <UCard variant="outline">
        <FeedbackRating :rating="kitchen?.rating ?? 0" class="ml-6 w-fit scale-150" />
      </UCard>
      <UCard variant="soft">
        <div class="text-sm/4">
          Важно: Рейтинг на данный момент расчитывается на основе внешних отзывов. В будущем это будет динамичная система с внутренними фидбеками.
        </div>
      </UCard>
    </div>

    <div class="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <UCard v-for="point in kitchen?.feedbackPoints" :key="point.id">
        <div class="w-full flex flex-col gap-2">
          <div class="w-full flex flex-row justify-between items-center">
            <div class="flex flex-row gap-2 items-center">
              <UIcon
                :name="getFeedbackPointDataByType(point.type)?.icon"
                class="size-8"
                :class="getFeedbackPointDataByType(point.type)?.color"
              />
              <h4 class="font-semibold">
                {{ getFeedbackPointDataByType(point.type)?.tooltip }}
              </h4>
            </div>

            <div class="shrink-0 w-fit flex flex-col items-end">
              <h4 class="text-lg/4">
                {{ point.rating.toFixed(1) }}
              </h4>
              <p class="text-sm text-muted">
                {{ point.reviews }} {{ pluralizationRu(point.reviews, ['оценка', 'оценки', 'оценок']) }}
              </p>
            </div>
          </div>

          <UButton
            variant="soft"
            color="neutral"
            size="md"
            :to="point.url ?? '#'"
            target="_blank"
            external
            block
            label="Открыть"
          />
        </div>
      </UCard>
    </div>
  </Content>
</template>

<script setup lang="ts">
const { params } = useRoute('kitchen-id')

const kitchenStore = useKitchenStore()
const kitchen = computed(() => kitchenStore.kitchens.find((k) => k.id === params.id))

useHead({
  title: 'Рейтинг кухни',
})
</script>
