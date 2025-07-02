<template>
  <Header title="SMM">
    <USelectMenu
      v-model="selectedType"
      size="lg"
      :items="types"
      placeholder="Выбрать платформу"
      class="w-full lg:w-48"
    />

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
      <div v-if="shownPosts.length" class="flex flex-col gap-8">
        <NuxtLink
          v-for="post in shownPosts"
          :key="post.id"
          :to="`/post/${post.id}`"
        >
          <PostCard :post-id="post.id" />
        </NuxtLink>
      </div>

      <div v-else>
        <p class="text-muted text-center">
          Постов не обнаружено
        </p>
      </div>
    </UContainer>
  </Content>
</template>

<script setup lang="ts">
import type { Post } from '@sushi-atrium/database'
import { ModalCreatePost } from '#components'

const { t } = useI18n()

const postStore = usePostStore()

const overlay = useOverlay()
const modalCreatePost = overlay.create(ModalCreatePost)

const types = [
  { label: 'Все', value: '' },
  { label: t('common.social.vk'), value: 'vk' as const, icon: 'i-simple-icons:vk' },
  { label: t('common.social.telegram'), value: 'telegram' as const, icon: 'i-simple-icons:telegram' },
]
const selectedType = ref<{ label: string, value: Post['type'] }>()

const shownPosts = computed(() => postStore.posts.filter((post) => selectedType.value?.value ? post.type === selectedType.value?.value : true))

useHead({
  title: 'SMM',
})
</script>
