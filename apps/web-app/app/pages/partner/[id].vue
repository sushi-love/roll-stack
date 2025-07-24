<template>
  <Header :title="`${partner?.name} ${partner?.surname}`">
    <template #submenu>
      <UNavigationMenu
        :items="submenuItems"
        highlight
        class="flex-1 -ml-2.5"
      />

      <!-- <UButton
        size="lg"
        variant="solid"
        color="secondary"
        class="w-full md:w-fit"
        icon="i-lucide-square-pen"
        :label="t('common.edit')"
        @click="() => {}"
      /> -->
    </template>
  </Header>

  <NuxtPage />
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { ru } from 'date-fns/locale/ru'

const { t } = useI18n()
const { params } = useRoute('partner-id')

const partnerStore = usePartnerStore()
const partner = computed(() => partnerStore.partners.find((partner) => partner.id === params.id))

const activeAgreementTo = computed(() => {
  if (!partner.value?.activeAgreement?.willEndAt) {
    return 'отсутствует'
  }

  return `до ${format(new Date(partner.value?.activeAgreement?.willEndAt), 'd MMMM yyyy', { locale: ru })}`
})

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
  {
    label: 'Договор',
    to: `/partner/${partner.value?.id}/agreement`,
    icon: 'i-lucide-scroll-text',
    badge: activeAgreementTo.value,
  },
  {
    label: 'Юр. лицо',
    to: `/partner/${partner.value?.id}/legal`,
    icon: 'i-lucide-scale',
  },
])

useHead({
  title: t('common.partner'),
})
</script>
