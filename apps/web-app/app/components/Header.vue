<template>
  <div class="h-16 shrink-0 flex items-center justify-between border-b border-default px-4 sm:px-6 gap-1.5">
    <div class="flex items-center gap-1.5 min-w-0">
      <HeaderMenuButton />

      <h1 class="flex items-center gap-1.5 font-medium text-lg text-highlighted truncate">
        {{ title }}
      </h1>
    </div>

    <div class="flex items-center shrink-0 gap-3">
      <slot />
    </div>
  </div>

  <template v-if="$slots.submenu">
    <div class="shrink-0 flex items-center justify-between border-b border-default px-4 sm:px-6 gap-1.5 overflow-x-auto min-h-[49px]">
      <slot name="submenu" />
    </div>
  </template>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>
