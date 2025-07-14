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
          name="fluent:star-28-regular"
          class="size-4 text-dimmed"
        />
        <UIcon
          v-if="star === 0.5"
          name="fluent:star-half-28-regular"
          class="size-4 text-amber-400"
          :class="[
            rating <= 2.5 && 'text-red-400',
          ]"
        />
        <UIcon
          v-if="star === 1"
          name="fluent:star-28-filled"
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
const { rating } = defineProps<{ rating: number }>()

const stars: [number, number, number, number, number] = [0, 0, 0, 0, 0] as const

for (let i = 0; i < 5; i++) {
  if (i < Math.round(rating)) {
    // 0.5 or 1?
    if (rating - i > 0.8) {
      stars[i] = 1
    } else {
      stars[i] = 0.5
    }
  }
}
</script>
