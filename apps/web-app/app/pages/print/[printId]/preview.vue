<template>
  <Content>
    <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
      <ProductVariantCard
        v-for="variant in product?.variants"
        :key="variant.id"
        :variant="variant"
        @click="modalUpdateProductVariant.open({ productVariantId: variant.id })"
      />

      <CreateCard
        icon="i-lucide-bookmark-plus"
        :label="$t('app.create.product-variant.button')"
        @click="modalCreateProductVariant.open({ productId: product?.id })"
      />
    </div>
  </Content>
</template>

<script setup lang="ts">
import { ModalCreateProductVariant, ModalUpdateProductVariant } from '#components'

const { params } = useRoute('product-productId-variants')
const overlay = useOverlay()
const modalUpdateProductVariant = overlay.create(ModalUpdateProductVariant)
const modalCreateProductVariant = overlay.create(ModalCreateProductVariant)

const productStore = useProductStore()
const product = computed(() => productStore.products.find((product) => product.id === params.productId))
if (!product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Product not found',
  })
}
</script>
