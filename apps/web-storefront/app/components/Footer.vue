<template>
  <div class="px-4 lg:px-6 xl:px-8 my-20 flex flex-col gap-3.5">
    <UNavigationMenu
      variant="link"
      orientation="vertical"
      :items="footerMenuItems"
      class="w-full -ml-2.5"
    />

    <div class="flex flex-col lg:flex-row gap-2 justify-between lg:items-center">
      <div class="font-sans text-xs text-muted whitespace-pre-wrap">
        {{ copyright }}
      </div>

      <UNavigationMenu
        :items="socialMenuItems"
        orientation="horizontal"
        variant="link"
        class="-mx-2.5"
      />
    </div>

    <div class="mt-18 max-w-md text-sm text-muted">
      <img
        src="/sushi-heart.svg"
        alt=""
        class="w-14 h-auto motion-preset-pulse motion-duration-4000"
      >

      <h4 class="mt-2 text-lg font-semibold">
        Хотите повторить наш успех?
      </h4>

      <ULink
        :to="url"
        target="_blank"
        external
        class="text-sm"
      >
        Приобретите франшизу и получите проверенную временем бизнес-модель + поддержку 24/7
      </ULink>
    </div>
  </div>
</template>

<script setup lang="ts">
const location = useBrowserLocation()

const projectUrl = 'https://fransh.sushi-love.ru'
const url = ref(projectUrl)

onMounted(() => {
  url.value = `${projectUrl}?ref=${location.value.host}`
})

const copyright = `© 2025 ООО “СУШИ ЛАВ”
ОГРН 1133926031030, ИНН 3906302510
236000, Калининградская область, г. Калининград, ул. Интернациональная, д. 58А

Информация на сайте не является публичной офертой.
Изображения товаров могут отличаться от оригинала.`

const links = [
  {
    type: 'footer',
    label: 'Политика конфиденциальности',
    to: '#',
    icon: '',
  },
  {
    type: 'footer',
    label: 'Пользовательское соглашение',
    to: '#',
    icon: '',
  },
  {
    type: 'footer',
    label: 'Правовая информация',
    to: '#',
    icon: '',
  },
  {
    type: 'social',
    label: 'telegram',
    to: 'https://t.me/sushiloveru',
    icon: 'simple-icons:telegram',
    target: '_blank',
  },
  {
    type: 'social',
    label: 'vk',
    to: 'https://vk.com/sushiloveru',
    icon: 'simple-icons:vk',
    target: '_blank',
  },
]

const footerMenuItems = computed(() => links.filter((link) => link.type === 'footer').map((link) => ({
  label: link.label,
  to: link.to,
  icon: link.icon ?? undefined,
  target: link.target,
})))

const socialMenuItems = computed(() => links.filter((link) => link.type === 'social').map((link) => ({
  to: link.to,
  icon: link.icon ?? undefined,
  target: '_blank',
})))
</script>
