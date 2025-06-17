<template>
  <UApp
    :locale="locales[locale]"
    :tooltip="{ delayDuration: 0 }"
    class="min-h-svh"
  >
    <NuxtLoadingIndicator :color="false" class="bg-primary h-[2px]" />
    <NuxtLayout v-if="publicEnv.cityId">
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import { ModalCitySelector } from '#components'
import * as locales from '@nuxt/ui/locale'

const overlay = useOverlay()
const modalCitySelector = overlay.create(ModalCitySelector)

const { public: publicEnv } = useRuntimeConfig()

const { locale } = useI18n()

const lang = computed(() => locales[locale.value].code)
const dir = computed(() => locales[locale.value].dir)

useHead({
  htmlAttrs: {
    lang,
    dir,
  },
})

// Init Stores
const menu = useMenuStore()
const checkout = useCheckoutStore()

onMounted(async () => {
  if (!publicEnv.cityId) {
    modalCitySelector.open({ dismissible: false })
    return
  }

  await Promise.all([
    menu.update(),
    checkout.update(),
  ])
})
</script>
