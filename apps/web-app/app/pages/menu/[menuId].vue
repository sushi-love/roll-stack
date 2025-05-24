<template>
  <Header :title="menu?.name ?? t('app.menu.menu')">
    <!-- <FormUpdateMenuActivity :menu-id="menu?.id ?? ''" :is-active="menu?.isActive ?? false" /> -->

    <template #submenu>
      <UNavigationMenu
        :items="categoryItems"
        highlight
        class="flex-1 -ml-2.5"
      />
    </template>
  </Header>

  <NuxtPage />
</template>

<script setup lang="ts">
const { params } = useRoute('menu-menuId')

const menuStore = useMenuStore()
const menu = computed(() => menuStore.menus.find((menu) => menu.id === params.menuId))

// if (!menu.menus) {
//   throw createError({ statusCode: 404, statusMessage: 'Menu not found' })
// }

const { t } = useI18n()

const categoryItems = computed(() => menu.value?.categories.map((category) => {
  return {
    label: category.name,
    to: `/menu/${menu.value?.id}/category/${category.id}`,
    icon: category.icon?.length ? category.icon : 'i-lucide-bookmark',
  }
}))
</script>
