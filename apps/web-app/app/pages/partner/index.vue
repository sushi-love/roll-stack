<template>
  <Header :title="t('app.menu.our-partners')">
    <div class="flex flex-row items-center gap-2">
      <p class="text-sm font-semibold">
        Сортировка
      </p>
      <UTabs
        v-model="activeSorting"
        :items="sorting"
        variant="pill"
        color="secondary"
        size="md"
        class="min-w-56 h-10"
      />
    </div>
  </Header>

  <Content>
    <template v-if="user.id">
      <div class="mb-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4.5">
        <template v-if="activeSorting === 'name'">
          <NuxtLink
            v-for="partner in partnersSortedByName"
            :key="partner.id"
            :to="`/partner/${partner.id}`"
          >
            <PartnerCard :user="partner" />
          </NuxtLink>
        </template>

        <template v-else>
          <NuxtLink
            v-for="partner in partnersSortedByPrestige"
            :key="partner.id"
            :to="`/partner/${partner.id}`"
          >
            <PartnerCard :user="partner" />
          </NuxtLink>
        </template>
      </div>
    </template>

    <template v-else>
      <Loader />
    </template>
  </Content>
</template>

<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const { t } = useI18n()

const sorting = ref<TabsItem[]>([
  {
    label: 'Имя',
    value: 'name',
    icon: 'i-lucide-user-pen',
  },
  {
    label: 'Рейтинг',
    value: 'rating',
    icon: 'i-lucide-star',
  },
])
const activeSorting = ref<'name' | 'rating'>('name')

const user = useUserStore()

const partnersSortedByName = computed(() => user.partners.toSorted((a, b) => a.name.localeCompare(b.name)))
const partnersSortedByPrestige = computed(() => user.partners.toSorted((a, b) => b.prestige - a.prestige))
</script>
