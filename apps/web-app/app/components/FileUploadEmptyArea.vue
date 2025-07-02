<template>
  <div class="w-full h-full min-h-20 p-4 border-2 border-dashed border-default rounded-lg group cursor-pointer">
    <div class="flex flex-col gap-1 items-center justify-center group-hover:scale-95 group-active:scale-90 duration-200">
      <UIcon
        name="i-lucide-cloud-upload"
        class="text-muted/25 size-8"
      />
      <p class="text-muted">
        {{ label }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string }>()
</script>
