<template>
  <StorefrontCatalogBreadcrumb :items="breadcrumbs" />

  <div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-x-0 gap-y-4 sm:gap-4">
      <div class="col-span-1 relative w-full aspect-3/2">
        <ProductImage
          :media="product?.media"
          :lazy="false"
          size="md"
        />
      </div>

      <div class="col-span-2">
        <h1 class="text-xl md:text-2xl lg:text-3xl font-medium">
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

          <UButton
            size="lg"
            variant="solid"
            color="secondary"
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
          <div>
            <div class="font-medium">
              {{ selectedVariant?.calories }}
            </div>
            <div class="lowercase">
              {{ $t('common.nutrition.kcal') }}
            </div>
          </div>
          <div>
            <div class="font-medium">
              {{ selectedVariant?.protein }}{{ $t('common.abbreviation.g') }}
            </div>
            <div class="lowercase">
              {{ $t('common.nutrition.protein') }}
            </div>
          </div>
          <div>
            <div class="font-medium">
              {{ selectedVariant?.fat }}{{ $t('common.abbreviation.g') }}
            </div>
            <div class="lowercase">
              {{ $t('common.nutrition.fat') }}
            </div>
          </div>
          <div>
            <div class="font-medium">
              {{ selectedVariant?.carbohydrate }}{{ $t('common.abbreviation.g') }}
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
definePageMeta({
  layout: 'storefront',
})

const { t, locale } = useI18n()
const { params } = useRoute('storefront-catalog-categorySlug-productSlug')
const toast = useToast()

const menuStore = useMenuStore()
const menu = computed(() => menuStore.menus[0])
const category = computed(() => menu.value?.categories.find((category) => category.slug === params.categorySlug))

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

const breadcrumbs = computed(() => [
  { label: t('common.home'), icon: 'i-lucide-house', to: '/storefront' },
  {
    label: category.value?.name ?? '',
    to: `/storefront/catalog/${category.value?.slug}`,
  },
])

function addToCart() {
  toast.add({
    title: `«${product.value?.name}» якобы добавлен в корзину 😉`,
    description: 'На самом деле нет. Так как корзины нет, но скоро появится.',
    color: 'success',
    icon: 'i-lucide-shopping-basket',
    duration: 3000,
  })
}
</script>
