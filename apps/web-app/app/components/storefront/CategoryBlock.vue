<template>
  <div class="mb-4 flex flex-row justify-between items-center gap-2">
    <h2 class="text-xl/5 md:text-2xl lg:text-3xl font-medium tracking-tight">
      {{ category?.name }}
    </h2>

    <UButton
      :to="`/storefront/catalog/${category?.slug}`"
      size="lg"
      variant="soft"
      color="neutral"
      trailing-icon="i-lucide-arrow-right"
      :label="$t('storefront.open-category')"
    />
  </div>

  <div
    class="mb-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6"
  >
    <StorefrontProductCard
      v-for="product in products"
      :key="product.id"
      :product-id="product.id"
      :category-id="categoryId"
      :lazy="!isFirst"
    />
  </div>
</template>

<script setup lang="ts">
const { categoryId } = defineProps<{
  categoryId: string
  isFirst?: boolean
}>()

const menuStore = useMenuStore()
const menu = computed(() => menuStore.menus[0])
const category = menu.value?.categories.find((c) => c.id === categoryId)
const products = category?.products.filter((p) => p.isAvailableForPurchase && p.variants.length).slice(0, 12)
</script>
