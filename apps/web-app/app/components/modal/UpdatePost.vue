<template>
  <UModal :title="$t('app.update.post.title')">
    <template #body>
      <FormUpdatePost
        :post-id="postId ?? ''"
        @submitted="overlay.closeAll"
        @success="overlay.closeAll"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{
  postId?: string
}>()

const overlay = useOverlay()
</script>
