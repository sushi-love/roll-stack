<template>
  <div class="flex flex-row items-center gap-1">
    <p
      class="font-semibold text-base/5 text-amber-500"
      :class="[
        rating <= 2.5 && 'text-red-500',
      ]"
    >
      {{ rating?.toFixed(1) }}
    </p>

    <div class="flex flex-row items-center">
      <template v-for="star in stars" :key="star">
        <UIcon
          v-if="star === 0"
          name="fluent:star-32-regular"
          class="size-4 text-dimmed"
        />
        <UIcon
          v-if="star === 1"
          name="fluent:star-32-filled"
          class="size-4 text-amber-400"
          :class="[
            rating <= 2.5 && 'text-red-400',
          ]"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
// Rating from 0 to 5
const { rating } = defineProps<{ rating: number }>()

const stars: number[] = [0, 0, 0, 0, 0]

for (let i = 0; i < 5; i++) {
  if (i < Math.round(rating)) {
    stars[i] = 1
  }
}
</script>
