<template>
  <CatalogBreadcrumb :items="breadcrumbs" />

  <h1 class="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight">
    {{ category?.name }}
  </h1>
  <div class="text-muted">
    {{ $t('storefront.category-page-description') }}
  </div>

  <div class="mt-6 mb-32 max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product-id="product.id"
      :category-id="category?.id ?? ''"
    />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { params } = useRoute('catalog-categorySlug')

const menuStore = useMenuStore()
const category = computed(() => menuStore.menu?.categories.find((category) => category.slug === params.categorySlug))
if (!category.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t('error.category-not-found'),
  })
}

const products = category.value.products.filter((p) => p.isAvailableForPurchase && p.variants.length)

useHead({
  title: category.value?.name,
})

const breadcrumbs = computed(() => [
  { label: t('common.home'), icon: 'i-lucide-house', to: '/' },
  { label: category.value?.name ?? '' },
])
</script>
