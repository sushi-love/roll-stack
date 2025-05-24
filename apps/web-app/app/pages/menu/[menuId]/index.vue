<template>
  <Content>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <NuxtLink
        v-for="category in menu?.categories"
        :key="category.id"
        :to="`/menu/${menu?.id}/category/${category.id}`"
        class="h-full"
      >
        <MenuCategoryCard
          :name="category.name"
          :icon="category.icon"
        />
      </NuxtLink>

      <CreateCard
        icon="i-lucide-bookmark-plus"
        label="Добавить категорию"
        @click="modalCreateMenuCategory.open({ menuId: menu?.id })"
      />
    </div>

    <GuideMenu />
  </Content>
</template>

<script setup lang="ts">
import { ModalCreateMenuCategory } from '#components'

const { params } = useRoute('menu-menuId')

const menuStore = useMenuStore()

const menu = computed(() => menuStore.menus.find((menu) => menu.id === params.menuId))
if (!menu.value) {
  throw createError({ statusCode: 404, statusMessage: 'Menu not found' })
}

const overlay = useOverlay()
const modalCreateMenuCategory = overlay.create(ModalCreateMenuCategory)
</script>
