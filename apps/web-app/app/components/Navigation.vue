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

const menuStore = useMenuStore()
const partnerStore = usePartnerStore()
const kitchenStore = useKitchenStore()

const menus = computed(() => menuStore.menus.map((menu) => ({
  label: menu.name,
  to: `/menu/${menu.id}`,
})))

const menuItems = computed(() => [
  {
    label: t('app.menu.my-space'),
    to: '/',
    icon: 'i-lucide-layout-dashboard',
    exact: true,
  },
  {
    label: t('app.menu.our-staff'),
    to: '/staff',
    icon: 'i-lucide-contact-round',
    active: route.path.startsWith('/staff'),
  },
  {
    label: t('app.menu.chats'),
    to: '/chat',
    icon: 'i-lucide-messages-square',
    active: route.path.startsWith('/chat'),
  },
  {
    label: t('app.menu.kitchens'),
    to: '/kitchen',
    icon: 'i-lucide-map-pinned',
    active: route.path.startsWith('/kitchen'),
    badge: kitchenStore.kitchens.length,
  },
  {
    label: t('app.menu.our-partners'),
    to: '/partner',
    icon: 'i-lucide-handshake',
    active: route.path.startsWith('/partner'),
    badge: partnerStore.partners.length,
  },
  {
    label: t('app.menu.products'),
    to: '/product',
    icon: 'i-lucide-cooking-pot',
    active: route.path.startsWith('/product'),
  },
  {
    label: t('app.menu.menu'),
    icon: 'i-lucide-book-copy',
    defaultOpen: route.path.startsWith('/menu'),
    children: [
      ...menus.value,
      // {
      //   label: t('center.create.menu'),
      //   icon: 'food:plus',
      //   onSelect: () => {
      //     modalCreateMenu.open()
      //   },
      // },
    ],
  },
])

const linkItems = computed(() => [
  {
    label: 'Новое меню',
    to: 'https://orderdemo.online',
    target: '_blank',
    icon: 'i-lucide-flask-conical',
  },
  {
    label: 'Заявки',
    to: '/checkout/list',
    icon: 'i-lucide-receipt-text',
  },
  {
    label: 'Все задачи',
    to: '/head/task',
    icon: 'i-lucide-list-checks',
    active: route.path.startsWith('/head/task'),
  },
  {
    label: 'SMM',
    to: '/post',
    icon: 'i-lucide-sticker',
    active: route.path.startsWith('/post'),
  },
  {
    label: t('app.menu.prints'),
    to: '/print',
    icon: 'i-lucide-printer',
    active: route.path.startsWith('/print'),
  },
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
