<template>
  <Header :title="product?.name ?? t('app.menu.product')">
    <FormUpdateProductAvailability
      :product-id="product?.id ?? ''"
      :is-available-for-purchase="product?.isAvailableForPurchase ?? false"
    />

    <template #submenu>
      <UNavigationMenu
        :items="submenuItems"
        highlight
        class="flex-1 -ml-2.5"
      />

      <UButton
        size="lg"
        variant="solid"
        color="secondary"
        class="w-full md:w-fit"
        icon="i-lucide-square-pen"
        :label="t('common.edit')"
        @click="modalUpdateProduct.open({ productId: product?.id, redirectTo: '/product' })"
      />
    </template>
  </Header>

  <NuxtPage />
</template>

<script setup lang="ts">
import { ModalUpdateProduct } from '#components'

const { params } = useRoute('product-productId')
const productStore = useProductStore()

const product = computed(() => productStore.products.find((product) => product.id === params.productId))
if (!product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Product not found',
  })
}

const { t } = useI18n()
const overlay = useOverlay()
const modalUpdateProduct = overlay.create(ModalUpdateProduct)

const submenuItems = computed(() => [
  {
    label: t('app.menu.product'),
    to: `/product/${product.value?.id}`,
    icon: 'i-lucide-cooking-pot',
    exact: true,
  },
  {
    label: t('app.product.variants'),
    to: `/product/${product.value?.id}/variants`,
    icon: 'i-lucide-bookmark-check',
  },
  {
    label: t('app.product.usage'),
    to: `/product/${product.value?.id}/usage`,
    icon: 'i-lucide-list',
  },
])
</script>
