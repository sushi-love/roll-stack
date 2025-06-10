<template>
  <div class="flex flex-col gap-4 flex-1 overflow-y-auto py-2">
    <div class="px-2.5 flex flex-col gap-1">
      <NuxtLink
        href="/storefront"
        class="font-semibold text-xl tracking-tight"
      >
        {{ menu?.name }}
      </NuxtLink>
      <div class="text-sm/4 text-muted">
        Более 180 гастрономических открытий ждут вас в нашем новом меню - от традиционных суши до смелых кулинарных экспериментов.
      </div>
    </div>

    <!-- <UNavigationMenu
      :items="mainMenuItems"
      orientation="vertical"
    /> -->

    <!-- <UNavigationMenu
      v-if="checkout.id"
      :items="deliveryMenuItems"
      orientation="vertical"
    /> -->

    <UNavigationMenu
      :items="catalogItems"
      orientation="vertical"
    />
  </div>

  <div class="shrink-0 flex items-center gap-1.5 py-2 px-2">
    <ColorModeToggle />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()

const menuStore = useMenuStore()
const menu = computed(() => menuStore.menus[0])

const preparedCategories = computed(() => menu.value?.categories.map((c) => ({
  label: c.name,
  to: `/storefront/catalog/${c.slug}`,
  active: route.path.startsWith(`/storefront/catalog/${c.slug}`),
  icon: c.icon?.length ? c.icon : 'i-lucide-bookmark',
})) ?? [])

// const title = computed(() => checkout.deliveryMethod === 'DELIVERY' ? t('app.cart.delivery') : t('app.cart.pickup'))
// const todayUntil = computed(() => channel.workingDay?.isActive ? channel.workingDay.close : undefined)

// const mainMenuItems = computed(() => channel.links.filter((link) => link.menuId === 'main').map((link) => ({
//   label: link.label,
//   to: link.to,
//   icon: link.icon ?? undefined,
//   target: link.target,
// })))

// const deliveryMenuItems = computed(() => [
//   {
//     label: title.value,
//     type: 'label' as const,
//   },
//   {
//     label: `${t('app.cart.today-until')} ${todayUntil.value}`,
//     icon: 'food:clock',
//   },
//   {
//     label: `${t('app.cart.from')} ${channel.minAmountForDelivery} ${channel.currencySign}`,
//     icon: 'food:delivery',
//     class: (checkout.deliveryMethod === 'DELIVERY' && channel.minAmountForDelivery) ? undefined : 'hidden',
//     onSelect: () => modalDeliveryInfo.open(),
//   },
//   {
//     label: t('app.show-details-label'),
//     icon: 'food:info',
//     onSelect: () => modalDeliveryInfo.open(),
//   },
// ])

const catalogItems = computed(() => [{
  label: t('storefront.catalog'),
  type: 'label' as const,
}, ...preparedCategories.value])
</script>
