<template>
  <Header :title="t('app.menu.roadmap')" />

  <Content>
    <UContainer class="mb-20 max-w-lg">
      <div
        v-for="year of years"
        :key="year"
        class="mt-12 flex flex-col gap-6"
      >
        <div class="flex flex-row gap-2 items-center justify-center">
          <UIcon name="fluent-emoji-flat:bullseye" class="size-12" />
          <h2 class="text-4xl font-bold text-secondary text-center">
            {{ year }}
          </h2>
        </div>

        <NuxtLink
          v-for="pin in pins?.filter((pin) => pin.year === year)"
          :key="pin.id"
          :to="`/roadmap/pin/${pin.id}`"
        >
          <ActiveCard class="w-full flex flex-col gap-5">
            <h3 class="text-xl font-semibold leading-6">
              {{ pin.title }}
            </h3>

            <div class="w-full text-md leading-6 whitespace-pre-wrap break-words">
              {{ pin.text }}
            </div>

            <div class="flex flex-row justify-between items-center">
              <UBadge
                :icon="getCategoryInfo(pin.category)?.icon"
                size="lg"
                color="neutral"
                variant="outline"
              >
                {{ getCategoryInfo(pin.category)?.title }}
              </UBadge>

              <div class="text-sm text-muted">
                {{ pin.date }}
              </div>
            </div>
          </ActiveCard>
        </NuxtLink>
      </div>

      <div class="mt-16 flex flex-row justify-center">
        <UIcon name="i-lucide-route" class="size-8 text-dimmed/25" />
      </div>
    </UContainer>
  </Content>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: 'Дорожная карта',
})

const { data: pins } = await useFetch('/api/roadmap/pins')

const years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013]
</script>
