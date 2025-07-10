<template>
  <Header :title="`${partner?.name} ${partner?.surname}`">
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
        @click="() => {}"
      />
    </template>
  </Header>

  <NuxtPage />
</template>

<script setup lang="ts">
const { t } = useI18n()
const { params } = useRoute('partner-id')

const partnerStore = usePartnerStore()
const partner = computed(() => partnerStore.partners.find((partner) => partner.id === params.id))

const submenuItems = computed(() => [
  {
    label: t('common.partner'),
    to: `/partner/${partner.value?.id}`,
    icon: 'i-lucide-handshake',
    exact: true,
  },
  {
    label: 'Кухни',
    to: `/partner/${partner.value?.id}/kitchens`,
    icon: 'i-lucide-map-pinned',
    badge: partner.value?.kitchens.length,
  },
])

useHead({
  title: t('common.partner'),
})
</script>
