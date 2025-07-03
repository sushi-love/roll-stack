<template>
  <Header :title="t('app.menu.roadmap-pin')" />

  <Content class="max-w-2xl space-y-6">
    <div class="flex flex-col gap-5">
      <h2 class="text-xl md:text-3xl font-bold">
        {{ data?.title }}
      </h2>

      <div class="w-full text-lg leading-6 whitespace-pre-wrap break-words">
        {{ data?.text }}
      </div>

      <div class="flex flex-row items-center gap-2">
        <UBadge
          :icon="getCategoryInfo(data?.category ?? '')?.icon"
          size="lg"
          color="neutral"
          variant="outline"
        >
          {{ getCategoryInfo(data?.category ?? '')?.title }}
        </UBadge>

        <UBadge
          icon="i-lucide-calendar-check-2"
          size="lg"
          color="neutral"
          variant="outline"
        >
          {{ data?.date }}
        </UBadge>
      </div>
    </div>
  </Content>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { params } = useRoute('roadmap-pin-id')

const { data, error } = await useFetch(`/api/roadmap/pin/${params.id}`)
if (error.value) {
  await navigateTo('/')
}
</script>
