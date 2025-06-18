<template>
  <UApp
    :locale="locales[locale]"
    :tooltip="{ delayDuration: 0 }"
    class="min-h-svh"
  >
    <NuxtLoadingIndicator :color="false" class="bg-primary h-[2px]" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

const { locale } = useI18n()

const lang = computed(() => locales[locale.value].code)
const dir = computed(() => locales[locale.value].dir)

useHead({
  htmlAttrs: {
    lang,
    dir,
  },
})

// Fix system theme
const colorMode = useColorMode()
watch(colorMode, () => {
  const colorModeStorage = localStorage.getItem('color-mode')

  if (colorMode.value === 'system' || colorModeStorage === 'system') {
    colorMode.value = 'light'
    localStorage.setItem('color-mode', 'light')
  }
})

// Init Stores
const user = useUserStore()
const menu = useMenuStore()
const product = useProductStore()
const chat = useChatStore()
const task = useTaskStore()
const notification = useNotificationStore()

await Promise.all([
  user.update(),
  menu.update(),
  product.update(),
  chat.update(),
  task.update(),
  notification.update(),
])
</script>
