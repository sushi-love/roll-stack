<template>
  <UModal :title="$t('app.update.post-photo.title')">
    <template #body>
      <FormUploadPostImage
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
