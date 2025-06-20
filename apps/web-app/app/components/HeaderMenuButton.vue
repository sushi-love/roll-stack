<template>
  <UButton
    icon="i-lucide-menu"
    color="neutral"
    variant="ghost"
    class="visible lg:hidden"
    @click="isNavbarOpened = true"
  />
</template>

<script setup lang="ts">
const { isNavbarOpened } = useApp()
</script>
