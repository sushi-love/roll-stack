<template>
  <UModal
    title="Выберите город"
    :ui="{ footer: 'justify-end' }"
    :close="dismissible"
    :dismissible="dismissible"
  >
    <template #body>
      <div class="flex flex-col gap-1">
        <UButton
          v-for="c in cityStore.cities"
          :key="c.id"
          :to="c.url"
          external
          variant="link"
          size="md"
          :label="c.name"
          class="px-0 py-0 text-lg font-semibold cursor-pointer"
          :class="{ '!text-secondary': c.id === city?.id }"
        />
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const { dismissible = true } = defineProps<{
  dismissible?: boolean
}>()

const { public: publicEnv } = useRuntimeConfig()
const cityStore = useCityStore()

const city = computed(() => cityStore.cities.find((c) => c.id === publicEnv.cityId))
</script>
