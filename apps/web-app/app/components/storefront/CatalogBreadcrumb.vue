<template>
  <div class="mb-6 flex flex-col md:flex-row gap-2 justify-between md:items-center">
    <UBreadcrumb :items="items">
      <template #separator>
        <span class="mx-1 text-dimmed">/</span>
      </template>
    </UBreadcrumb>

    <UButton
      variant="soft"
      color="neutral"
      size="lg"
      icon="i-lucide-undo-2"
      class="w-full md:w-auto mx-auto md:mx-0 justify-center"
      :label="$t('common.return')"
      @click="back()"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  items: { label: string, icon?: string, to?: string }[]
}>()

const { back } = useRouter()
</script>
