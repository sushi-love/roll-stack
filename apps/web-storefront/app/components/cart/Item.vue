<template>
  <div class="mb-4 flex flex-row gap-2 items-center justify-between">
    <NuxtLink :to="productUrl">
      <div class="max-w-[15rem] flex flex-row gap-2 flex-nowrap items-center cursor-pointer active:scale-95 lg:hover:scale-95 lg:active:scale-90 duration-200 group">
        <div class="shrink-0 relative w-14 h-auto aspect-3/2">
          <ProductImage :media="product?.media" size="xs" />
        </div>

        <div>
          <p class="font-base text-xs/3 line-clamp-2">
            {{ product?.name }}
          </p>
          <div class="mt-1 flex flex-row gap-2 flex-nowrap items-center">
            <div class="text-sm font-medium tracking-tight">
              {{ new Intl.NumberFormat(locale).format(productVariant?.gross ?? 0) }} <span class="text-xs">{{ channelStore.currencySign }}</span>
            </div>
            <div class="text-sm text-dimmed font-light">
              {{ productVariant?.weightValue }}{{ getWeightLocalizedUnit(productVariant?.weightUnit) }}
            </div>
          </div>
        </div>
      </div>
    </NuxtLink>

    <CartItemCounter :item-id="itemId" />
  </div>
</template>

<script setup lang="ts">
const { itemId } = defineProps<{
  itemId: string
}>()

const { locale } = useI18n()

const checkoutStore = useCheckoutStore()
const channelStore = useChannelStore()
const menuStore = useMenuStore()

const item = computed(() => checkoutStore.items?.find((i) => i.id === itemId))
const productVariant = computed(() => item.value?.productVariant)

const product = computed(() => menuStore.products.find((product) => product.id === item.value?.productVariant.productId))
const category = computed(() => menuStore.menu?.categories.find((category) => category.products.some((product) => product.id === item.value?.productVariant.productId)))
const productUrl = computed(() => `/catalog/${category.value?.slug}/${product.value?.slug}`)
</script>
