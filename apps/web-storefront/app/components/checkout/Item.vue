<template>
  <div class="flex flex-row gap-2 items-center justify-between">
    <NuxtLink :to="productUrl" class="max-w-[16rem] flex flex-row gap-2 flex-nowrap items-center cursor-pointer active:scale-95 lg:hover:scale-95 lg:active:scale-90 duration-200 group">
      <div class="shrink-0 relative w-14 h-auto aspect-3/2">
        <ProductImage :media="product?.media" size="xs" />
      </div>

      <div class="space-y-1">
        <div class="font-medium text-default leading-tight line-clamp-2">
          {{ product?.name }}
        </div>
        <div class="flex flex-row gap-2 flex-nowrap items-center">
          <p class="text-sm text-muted leading-tight">
            {{ productVariant?.name }}
          </p>
          <p class="text-sm text-muted">
            {{ productVariant?.weightValue }}{{ getWeightLocalizedUnit(productVariant?.weightUnit) }}
          </p>
        </div>
      </div>
    </NuxtLink>

    <div class="ml-auto">
      <div v-if="canBeChanged">
        <CartItemCounter :item-id="item?.id ?? ''" />
      </div>
      <div v-else class="text-lg">
        x{{ item?.quantity }}
      </div>
    </div>

    <div class="min-w-[3rem] ml-0 md:ml-4 md:text-lg text-right tracking-tight">
      {{ totalAmount }} <span class="text-sm">{{ channelStore.currencySign }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CheckoutItem, ProductVariant } from '@sushi-atrium/database'

type CheckoutItemWithProduct = CheckoutItem & { productVariant: ProductVariant }

const { item, canBeChanged = true } = defineProps<{
  item: CheckoutItemWithProduct
  canBeChanged?: boolean
}>()

const { locale } = useI18n()

const channelStore = useChannelStore()
const menuStore = useMenuStore()

// const item = computed(() => checkoutStore.items?.find((i) => i.id === itemId))
const productVariant = computed(() => item?.productVariant)
const product = computed(() => menuStore.products.find((product) => product.id === item?.productVariant.productId))
const category = computed(() => menuStore.menu?.categories.find((category) => category.products.some((product) => product.id === item?.productVariant.productId)))

const productUrl = computed(() => `/catalog/${category.value?.slug}/${product.value?.slug}`)
const totalAmount = computed(() => new Intl.NumberFormat(locale.value).format(productVariant.value?.gross && item?.quantity ? productVariant.value.gross * item.quantity : 0))
</script>
