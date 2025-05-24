<template>
  <Content>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div class="relative w-full aspect-3/2 object-cover col-span-1">
        <ProductImage
          :id="product?.mediaId"
          :media="product?.media"
          :lazy="false"
          size="md"
        />

        <div class="absolute top-2 left-2 bg-default rounded-lg">
          <UButton
            variant="subtle"
            color="neutral"
            size="xl"
            icon="i-lucide-image-up"
            class="p-3 justify-center items-center"
            @click="modalUploadProductImage.open({ productId: product?.id })"
          />
        </div>
      </div>

      <div class="flex flex-col gap-2 col-span-2">
        <h3 class="text-muted">
          Описание продукта:
        </h3>

        <div class="text-lg">
          <p v-if="product?.description">
            {{ product?.description }}
          </p>
          <p v-else class="text-dimmed">
            {{ $t('app.product.no-description') }}
          </p>
        </div>
      </div>
    </div>
  </Content>
</template>

<script setup lang="ts">
import { ModalUploadProductImage } from '#components'

const { params } = useRoute('product-productId')

const overlay = useOverlay()
const modalUploadProductImage = overlay.create(ModalUploadProductImage)

const productStore = useProductStore()
const product = computed(() => productStore.products.find((product) => product.id === params.productId))
if (!product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Product not found',
  })
}
</script>
