<template>
  <Header :title="t('app.menu.idea')" />

  <Content class="max-w-2xl space-y-6">
    {{ params.id }}
  </Content>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { params } = useRoute('idea-id')
</script>
