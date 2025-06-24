<template>
  <div class="flex flex-row gap-2 items-center justify-between">
    <div class="max-w-[16rem] flex flex-col flex-nowrap">
      <div class="font-medium leading-tight line-clamp-2">
        {{ item.productVariant.product?.name }}
      </div>
      <div class="mt-1 flex flex-row gap-2 flex-nowrap items-center">
        <p class="text-neutral-500 dark:text-neutral-400 leading-tight">
          {{ item.productVariant?.name }}
        </p>
        <p class="text-neutral-500 dark:text-neutral-400">
          {{ item.productVariant?.weightValue }}{{ getWeightLocalizedUnit(item.productVariant?.weightUnit) }}
        </p>
      </div>
    </div>

    <div class="ml-auto">
      <div class="text-lg">
        x{{ item?.quantity }}
      </div>
    </div>

    <div class="min-w-[3rem] ml-0 md:ml-4 text-base md:text-lg text-right tracking-tight">
      {{ item?.totalPrice }} <span class="text-xs">₽</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CheckoutItem, Product, ProductVariant } from '@sushi-atrium/database'

const { item } = defineProps<{
  item: CheckoutItem & {
    productVariant: ProductVariant & {
      product: Product
    }
  }
}>()

// const { locale } = useI18n()

// const channel = useChannelStore()
// const checkoutStore = useCheckoutStore()

// const checkout = computed(() => checkoutStore.checkouts?.find((c) => c.items?.find((l) => l.id === itemId)))
// const item = computed(() => checkout.value?.items?.find((l) => l.id === itemId))
// const totalAmount = computed(() => item ? new Intl.NumberFormat(locale.value).format(item.totalPrice) : 0)

// const productVariant = channel.getProductVariant(item.value?.productVariantId ?? '')
// const product = channel.getProduct(productVariant.value?.productId ?? '')
</script>
