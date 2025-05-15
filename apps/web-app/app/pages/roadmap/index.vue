<template>
  <Header :title="t('app.menu.roadmap')" />

  <Content>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-6" />
  </Content>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
