<template>
  <Header :title="print?.name ?? t('app.menu.print')">
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
        @click="modalUpdatePrint.open({ printId: print?.id, redirectTo: '/print' })"
      />
    </template>
  </Header>

  <NuxtPage />
</template>

<script setup lang="ts">
import { ModalUpdatePrint } from '#components'

const { params } = useRoute('print-printId')
const printStore = usePrintStore()

const print = computed(() => printStore.prints.find((product) => product.id === params.printId))
if (!print.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Материал не найден',
  })
}

const { t } = useI18n()
const overlay = useOverlay()
const modalUpdatePrint = overlay.create(ModalUpdatePrint)

const submenuItems = computed(() => [
  {
    label: t('app.menu.print'),
    to: `/print/${print.value?.id}`,
    icon: 'i-lucide-file-image',
    exact: true,
  },
  {
    label: t('common.preview'),
    to: `/print/${print.value?.id}/preview`,
    icon: 'i-lucide-images',
  },
])
</script>
