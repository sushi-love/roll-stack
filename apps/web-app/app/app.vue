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
const post = usePostStore()
const print = usePrintStore()

await Promise.all([
  // user.update(),
  // task.update(),
  menu.update(),
  product.update(),
  chat.update(),
  notification.update(),
  post.update(),
  print.update(),
])

// Auto Update Online
let interval: NodeJS.Timeout

onMounted(async () => {
  await Promise.all([
    user.updateOnline(),
    user.update(),
    task.update(),
  ])

  interval = setInterval(async () => {
    await Promise.all([
      user.updateOnline(),
      user.update(),
      task.update(),
    ])
  }, 30000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>
