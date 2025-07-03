<template>
  <ActiveCard padding="sm" class="w-full flex flex-col gap-5 motion-preset-bounce">
    <div class="flex flex-row gap-2.5 items-center">
      <UTooltip :text="social.title">
        <UIcon :name="social.icon" class="size-8 text-dimmed/50" />
      </UTooltip>

      <UTooltip v-if="post?.publishAt" text="Дата итоговой публикации">
        <p class="text-base text-muted">
          {{ format(new Date(post.publishAt), 'd MMMM HH:mm', { locale: ru }) }}
        </p>
      </UTooltip>
    </div>

    <UTooltip v-if="post?.media" text="Фотография">
      <PostImage :media="post?.media" size="lg" />
    </UTooltip>

    <div class="text-base/5 whitespace-pre-wrap">
      {{ post?.content }}
    </div>

    <div v-if="post?.description" class="px-3.5 py-2 w-fit text-sm/5 text-neutral-900 bg-warning-100 rounded-md">
      {{ post.description }}
    </div>

    <div class="flex flex-row justify-between items-center">
      <div class="flex flex-row gap-4">
        <div class="flex flex-row gap-1.5 items-center text-muted">
          <UIcon name="i-lucide-heart" class="size-5" />
          <p>{{ post?.likes.length }}</p>
        </div>

        <div class="flex flex-row gap-1.5 items-center text-muted">
          <UIcon name="i-lucide-message-circle" class="size-5" />
          <p>{{ post?.comments.length }}</p>
        </div>
      </div>

      <div class="text-muted">
        {{ status }}
      </div>
    </div>
  </ActiveCard>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { ru } from 'date-fns/locale/ru'

const { postId } = defineProps<{ postId: string }>()

const postStore = usePostStore()
const post = computed(() => postStore.posts.find((post) => post.id === postId))

const social = computed(() => getSocialInfo(post.value?.type))
const status = computed(() => getLocalizedPostStatus(post.value?.status ?? ''))
</script>
