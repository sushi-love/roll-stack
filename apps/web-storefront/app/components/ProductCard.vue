<template>
  <ULink
    :to="productUrl"
    :active="true"
    class="h-auto w-auto cursor-pointer active:scale-95 lg:active:scale-90 lg:hover:scale-95 duration-200"
  >
    <div class="flex flex-col justify-between gap-2 h-full">
      <div class="relative w-full aspect-3/2">
        <ProductImage
          :media="product?.media"
          :lazy="lazy"
          size="md"
        />
      </div>

      <div class="flex-1">
        <div class="text-xl font-medium">
          <span v-if="!withSingleVariant" class="pr-1">{{ $t('storefront.cart.from') }}</span>
          <span>{{ price }}</span>
          <span class="pl-1 text-lg">{{ menuStore.currencySign }}</span>
        </div>
        <p class="font-normal leading-tight line-clamp-2">
          {{ product?.name }}
        </p>
        <div class="mt-2 font-light text-neutral-500 dark:text-white">
          <span v-if="!withSingleVariant" class="pr-1">{{ $t('storefront.cart.from') }}</span>
          <span>{{ weightValue }}{{ weightUnit }}</span>
        </div>
      </div>

      <UButton
        variant="soft"
        color="neutral"
        size="xl"
        icon="i-lucide-plus"
        class="justify-center items-center font-normal"
        :ui="{
          leadingIcon: 'size-4 text-muted/50',
        }"
      >
        {{ $t('storefront.cart.add') }}
      </UButton>
    </div>
  </ULink>
</template>

<script setup lang="ts">
const { productId, categoryId } = defineProps<{
  productId: string
  categoryId: string
  lazy?: boolean
}>()

const { locale } = useI18n()

const menuStore = useMenuStore()
const category = computed(() => menuStore.menu?.categories.find((category) => category.id === categoryId))
const product = category.value?.products.find((product) => product.id === productId)

const withSingleVariant = computed<boolean>(() => product?.variants.length === 1)
const smallestVariant = computed(() => product?.variants[0])

const price = computed(() => new Intl.NumberFormat(locale.value).format(smallestVariant.value?.gross ?? 0))
const weightValue = computed(() => smallestVariant.value?.weightValue)
const weightUnit = computed(() => getWeightLocalizedUnit(smallestVariant.value?.weightUnit))
const productUrl = computed(() => `/catalog/${category.value?.slug}/${product?.slug}`)
</script>
