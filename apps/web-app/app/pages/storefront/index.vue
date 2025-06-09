<template>
  <div class="mb-12 flex flex-row gap-6 items-center">
    <div class="flex flex-col items-center justify-center shrink-0 size-28 bg-secondary rounded-lg">
      <img
        src="/sushi-heart.svg"
        alt=""
        class="w-20 h-auto grayscale-100 brightness-1000 motion-preset-pulse motion-duration-4000"
      >
    </div>

    <div class="flex flex-col gap-2">
      <h1 class="text-3xl md:text-4xl font-semibold tracking-tight">
        {{ menu?.name }}
      </h1>
      <div class="max-w-xl text-lg/5">
        Более 170 гастрономических открытий ждут вас в нашем новом меню - от традиционных суши до смелых кулинарных экспериментов.
      </div>
    </div>
  </div>

  <StorefrontCategoryBlock
    v-for="(category, index) in menu?.categories"
    :key="category.id"
    :category-id="category.id"
    :is-first="index === 0"
  />

  <div class="my-20" />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'storefront',
})

const menuStore = useMenuStore()
const menu = computed(() => menuStore.menus[0])

useHead({
  title: menu.value?.name,
})
</script>
