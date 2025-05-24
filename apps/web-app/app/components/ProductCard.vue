<template>
  <NuxtLink :to="`/product/${productId}`">
    <ActiveCard padding="none">
      <div class="flex flex-col justify-between">
        <div class="relative w-full aspect-3/2">
          <template v-if="isWarning">
            <div class="z-10 absolute top-2 left-2 bg-default rounded-lg motion-scale-loop-105">
              <UTooltip text="Есть проблема!">
                <UButton
                  variant="subtle"
                  color="warning"
                  size="xl"
                  icon="i-lucide-triangle-alert"
                />
              </UTooltip>
            </div>
          </template>

          <ProductImage :media="product?.media" size="sm" />
        </div>

        <div class="px-3 py-3 h-full flex flex-col justify-between">
          <p class="text-sm leading-tight line-clamp-2">
            {{ product?.name }}
          </p>

          <div class="mt-4">
            <div
              v-for="variant in product?.variants"
              :key="variant.id"
              class="flex justify-between"
            >
              <p class="text-muted">
                {{ variant.weightValue }}{{ getWeightLocalizedUnit(variant.weightUnit) }}
              </p>
              <p class="font-medium">
                {{ new Intl.NumberFormat(locale).format(variant.gross) }}<span class="pl-1 text-xs">{{ menuStore.currencySign }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ActiveCard>
  </NuxtLink>
</template>

<script setup lang="ts">
const { productId } = defineProps<{
  productId: string
}>()

const { locale } = useI18n()

const menuStore = useMenuStore()
const productStore = useProductStore()

const product = computed(() => productStore.products.find((product) => product.id === productId))
const isWarning = computed(() => product.value?.variants?.length === 0 || !product.value?.isAvailableForPurchase)
</script>
