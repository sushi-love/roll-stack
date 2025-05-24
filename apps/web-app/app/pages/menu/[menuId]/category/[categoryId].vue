<template>
  <Content>
    <div class="flex flex-row gap-3.5 items-center">
      <h2 class="text-xl lg:text-3xl font-medium">
        {{ category?.name }}
      </h2>

      <UTooltip text="Обновить информацию">
        <UButton
          variant="soft"
          color="neutral"
          size="lg"
          trailing-icon="i-lucide-square-pen"
          @click="modalUpdateMenuCategory.open({ categoryId: category?.id ?? '', redirectTo })"
        />
      </UTooltip>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      <ProductCard
        v-for="product in productsInCategory"
        :key="product.id"
        :product-id="product.id"
      />
      <CreateCard
        icon="i-lucide-cooking-pot"
        :label="t('app.attach.product.button')"
        @click="modalAttachProduct.open({ categoryId: category?.id ?? '' })"
      />
    </div>
  </Content>
</template>

<script setup lang="ts">
import { ModalAttachProduct, ModalUpdateMenuCategory, UButton } from '#components'

const { t } = useI18n()
const { params } = useRoute('menu-menuId-category-categoryId')

const menuStore = useMenuStore()
const productStore = useProductStore()

const category = computed(() => menuStore.menus.find((menu) => menu.id === params.menuId)?.categories.find((c) => c.id === params.categoryId))
if (!category.value) {
  throw createError({ statusCode: 404, statusMessage: 'Category not found' })
}

const productsInCategory = computed(() => productStore.products.filter((product) => product.categories.some((c) => c.menuCategoryId === params.categoryId)))

const overlay = useOverlay()
const modalUpdateMenuCategory = overlay.create(ModalUpdateMenuCategory)
const modalAttachProduct = overlay.create(ModalAttachProduct)

const redirectTo = computed(() => {
  return `/menu/${params.menuId}`
})
</script>
