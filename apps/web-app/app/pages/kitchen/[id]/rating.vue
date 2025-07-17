<template>
  <Content>
    <div class="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <UCard
        variant="outline"
        :ui="{
          body: 'h-full',
        }"
      >
        <div class="h-full flex flex-col items-center justify-center">
          <FeedbackRating :rating="kitchen?.rating ?? 0" class="w-fit scale-150" />
        </div>
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
              <h4 class="text-xl/5 font-semibold">
                {{ point.rating.toFixed(1) }}
              </h4>
              <p class="text-sm/4 text-muted">
                {{ point.ratings }} {{ pluralizationRu(point.ratings, ['оценка', 'оценки', 'оценок']) }}
              </p>
              <p class="text-sm/4 text-muted">
                {{ point.reviews }} {{ pluralizationRu(point.reviews, ['отзыв', 'отзыва', 'отзывов']) }}
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

    <h3 class="mt-6 text-lg md:text-2xl font-medium">
      Последние отзывы
    </h3>

    <div class="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      <ClientReviewCard
        v-for="review in reviews"
        :key="review.id"
        :review="review"
      />
    </div>
  </Content>
</template>

<script setup lang="ts">
const { params } = useRoute('kitchen-id')

const clientStore = useClientStore()
const kitchenStore = useKitchenStore()
const kitchen = computed(() => kitchenStore.kitchens.find((k) => k.id === params.id))
const reviews = computed(() => clientStore.reviews.filter((r) => r.kitchenId === params.id))

useHead({
  title: 'Рейтинг кухни',
})
</script>
