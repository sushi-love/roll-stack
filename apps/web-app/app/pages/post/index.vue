<template>
  <Header title="SMM">
    <UButton
      size="lg"
      variant="solid"
      color="secondary"
      class="w-full md:w-fit"
      icon="i-lucide-calendar-plus"
      label="Создать пост"
      @click="modalCreatePost.open()"
    />
  </Header>

  <Content>
    <UContainer class="mt-4 mb-20 max-w-lg">
      <div class="flex flex-col gap-6">
        <PostCard
          v-for="post in postStore.posts"
          :key="post.id"
          :post-id="post.id"
        />
      </div>
    </UContainer>
  </Content>
</template>

<script setup lang="ts">
import { ModalCreatePost } from '#components'

const postStore = usePostStore()

const overlay = useOverlay()
const modalCreatePost = overlay.create(ModalCreatePost)

useHead({
  title: 'SMM',
})
</script>
