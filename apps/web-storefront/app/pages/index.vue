<template>
  <div class="mb-12 flex flex-row gap-6 md:items-center">
    <div class="flex flex-col items-center justify-center shrink-0 size-28 bg-linear-to-br from-secondary-400 to-secondary-500 rounded-lg">
      <img
        src="/sushi-heart-light.png"
        alt=""
        class="w-20 h-auto"
      >
    </div>

    <div class="flex flex-col gap-2">
      <h1 class="text-2xl md:text-3xl font-semibold tracking-tight">
        {{ channelStore?.name }}
      </h1>
      <div class="max-w-xl text-base/5 md:text-lg/5">
        {{ channelStore?.description }}
      </div>
    </div>
  </div>

  <CategoryBlock
    v-for="(category, index) in menuStore.menu?.categories"
    :key="category.id"
    :category-id="category.id"
    :is-first="index === 0"
  />

  <div class="my-20" />
</template>

<script setup lang="ts">
const channelStore = useChannelStore()
const menuStore = useMenuStore()

useHead({
  title: channelStore?.name,
})
</script>
