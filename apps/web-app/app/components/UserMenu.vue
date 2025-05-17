<template>
  <UDropdownMenu
    size="lg"
    :items="userMenuItems"
    :search-input="false"
    :content="{ side: 'top', align: 'center' }"
    :ui="{ content: 'w-64' }"
  >
    <UButton
      :avatar="{ src: user.avatar ?? undefined }"
      :ui="{ trailingIcon: 'text-dimmed' }"
      :label="user.fullName ?? t('common.colleague')"
      block
      color="neutral"
      variant="ghost"
      trailing-icon="i-lucide-ellipsis-vertical"
      class="text-md"
    />
  </UDropdownMenu>
</template>

<script setup lang="ts">
const { clear, fetch: refreshSession } = useUserSession()
const { t } = useI18n()
const colorMode = useColorMode()

const user = useUserStore()

async function signOut() {
  await clear()
  await refreshSession()
  await navigateTo('/sign-in')
}

const userMenuItems = computed(() => [
  {
    label: user.fullName ?? t('common.colleague'),
    type: 'label' as const,
    avatar: {
      src: user.avatar ?? undefined,
    },
  },
  {
    type: 'separator' as const,
  },
  {
    label: t('common.color-mode.title'),
    icon: 'lucide:sun-moon',
    children: [
      {
        label: t('common.color-mode.light'),
        type: 'checkbox' as const,
        icon: 'lucide:sun-dim',
        onUpdateChecked(checked: boolean) {
          if (checked) {
            colorMode.preference = 'light'
          }
        },
      },
      {
        label: t('common.color-mode.dark'),
        type: 'checkbox' as const,
        icon: 'lucide:moon',
        onUpdateChecked(checked: boolean) {
          if (checked) {
            colorMode.preference = 'dark'
          }
        },
      },
    ],
  },
  {
    type: 'separator' as const,
  },
  {
    label: t('common.sign-out'),
    type: 'link' as const,
    icon: 'lucide:log-out',
    onSelect: signOut,
  },
])
</script>
