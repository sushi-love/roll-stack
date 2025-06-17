<template>
  <CatalogBreadcrumb :items="breadcrumbs" />

  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-0 gap-y-4 sm:gap-4">
      <div class="col-span-1 lg:col-span-2 relative w-full aspect-3/2">
        <ProductImage
          :media="product?.media"
          :lazy="false"
          size="xl"
        />
      </div>

      <div class="col-span-1 md:col-span-2">
        <h1 class="text-xl/6 md:text-2xl/6 lg:text-3xl/7 font-medium">
          {{ product?.name }}
        </h1>
        <div class="mt-1 font-normal text-muted flex flex-row gap-3">
          <span>{{ weightValue }}{{ weightUnit }}</span>
          <span>{{ selectedVariant?.name }}</span>
        </div>

        <div v-if="!withSingleVariant" class="mt-4 mb-6">
          <USelect
            v-model="variantId"
            :items="product?.variants.map((variant) => ({ label: variant.name, value: variant.id }))"
            size="xl"
            icon="i-lucide-bookmark-check"
            class="min-w-56"
          />
        </div>

        <div class="mt-4 flex flex-row gap-6 items-center">
          <div class="text-2xl font-medium tracking-tight">
            {{ price }} <span class="text-xl">{{ menuStore.currencySign }}</span>
          </div>

          <CartItemCounter v-if="inCart" :item-id="inCart.id" />
          <UButton
            v-else
            size="xl"
            variant="gradient"
            icon="i-lucide-shopping-basket"
            :label="$t('storefront.cart.add-full')"
            @click="addToCart"
          />
        </div>
      </div>
    </div>

    <div class="mt-6 flex flex-col md:flex-row gap-6">
      <div v-if="product?.description" class="flex-1">
        <div class="mb-2 font-medium text-muted">
          {{ $t('common.description') }}
        </div>
        <div class="text-lg/6">
          {{ product.description }}
        </div>
      </div>

      <div v-if="selectedVariant?.calories != null" class="shrink-0">
        <div class="mb-2 font-medium text-muted">
          {{ $t('common.nutrition.value-title') }}
        </div>
        <div class="p-4 w-fit flex flex-row gap-4 md:gap-6 bg-elevated/50 rounded-lg">
          <div v-if="selectedVariant?.calories != null">
            <div class="font-medium">
              {{ selectedVariant?.calories.toFixed(1) }}
            </div>
            <div class="lowercase">
              {{ $t('common.nutrition.kcal') }}
            </div>
          </div>
          <div v-if="selectedVariant?.protein">
            <div class="font-medium">
              {{ selectedVariant?.protein.toFixed(1) }}{{ $t('common.abbreviation.g') }}
            </div>
            <div class="lowercase">
              {{ $t('common.nutrition.protein') }}
            </div>
          </div>
          <div v-if="selectedVariant?.fat">
            <div class="font-medium">
              {{ selectedVariant?.fat.toFixed(1) }}{{ $t('common.abbreviation.g') }}
            </div>
            <div class="lowercase">
              {{ $t('common.nutrition.fat') }}
            </div>
          </div>
          <div v-if="selectedVariant?.carbohydrate">
            <div class="font-medium">
              {{ selectedVariant?.carbohydrate.toFixed(1) }}{{ $t('common.abbreviation.g') }}
            </div>
            <div class="lowercase">
              {{ $t('common.nutrition.carbohydrate') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const { params } = useRoute('catalog-categorySlug-productSlug')
const toast = useToast()

const checkoutStore = useCheckoutStore()
const menuStore = useMenuStore()
const category = computed(() => menuStore.menu?.categories.find((category) => category.slug === params.categorySlug))

const product = computed(() => category.value?.products.find((product) => product.slug === params.productSlug))
if (!product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Product not found',
  })
}

useHead({
  title: product.value?.name,
})

const variantId = ref(product.value.variants[0]?.id)
const withSingleVariant = computed(() => product.value?.variants.length === 1)
const selectedVariant = computed(() => product.value?.variants.find(({ id }) => id === variantId.value))

const price = computed(() => new Intl.NumberFormat(locale.value).format(selectedVariant.value?.gross ?? 0))
const weightValue = computed(() => selectedVariant.value?.weightValue)
const weightUnit = computed(() => getWeightLocalizedUnit(selectedVariant.value?.weightUnit))

const inCart = computed(() => checkoutStore.items.find((i) => i.productVariantId === selectedVariant.value?.id))

const breadcrumbs = computed(() => [
  { label: t('common.home'), icon: 'i-lucide-house', to: '/' },
  {
    label: category.value?.name ?? '',
    to: `/catalog/${category.value?.slug}`,
  },
])

function addToCart() {
  checkoutStore.add(variantId.value ?? '')
  toast.add({
    title: `«${product.value?.name}»`,
    description: 'У вас отличный вкус! Товар успешно добавлен в корзину 😉',
    color: 'success',
    icon: 'i-lucide-shopping-basket',
    duration: 5000,
  })
}
</script>
