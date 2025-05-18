<template>
  <div class="flex flex-col gap-4 flex-1 overflow-y-auto px-4 py-2">
    <UNavigationMenu
      :items="menuItems"
      orientation="vertical"
    />

    <UNavigationMenu
      :items="linkItems"
      orientation="vertical"
      class="mt-auto"
    />
  </div>

  <div class="shrink-0 flex items-center gap-1.5 px-4 py-2 lg:border-t lg:border-default">
    <UserMenu />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()

const menuItems = computed(() => [
  {
    label: t('app.menu.my-space'),
    to: '/',
    icon: 'i-lucide-layout-dashboard',
    exact: true,
  },
  {
    label: t('app.menu.our-partners'),
    to: '/partner',
    icon: 'i-lucide-handshake',
    active: route.path.startsWith('/partner'),
  },
  {
    label: t('app.menu.our-staff'),
    to: '/staff',
    icon: 'i-lucide-contact-round',
    active: route.path.startsWith('/staff'),
  },
])

const linkItems = computed(() => [
  {
    label: t('app.menu.suggest-idea'),
    to: '/idea',
    icon: 'i-lucide-message-square-heart',
    active: route.path.startsWith('/idea'),
  },
  {
    label: t('app.menu.roadmap'),
    to: '/roadmap',
    icon: 'i-lucide-map',
    active: route.path.startsWith('/roadmap'),
  },
])
</script>
