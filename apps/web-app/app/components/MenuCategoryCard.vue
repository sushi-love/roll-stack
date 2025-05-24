<template>
  <ActiveCard>
    <div class="h-full flex flex-col gap-2 items-center justify-center text-center">
      <UIcon :name="icon?.length ? icon : 'i-lucide-bookmark'" class="size-8 text-dimmed" />

      <h3 class="text-xl font-medium">
        {{ name }}
      </h3>
    </div>
  </ActiveCard>
</template>

<script setup lang="ts">
defineProps<{ name: string, icon: string | null }>()
</script>
