<template>
  <div class="p-4 flex flex-col gap-5 motion-preset-bounce ring ring-default/50 h-full rounded-lg bg-elevated/25">
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

    <UTooltip :text="$t('app.update.post-photo.button')">
      <PostImage
        :media="post?.media"
        size="lg"
        class="cursor-pointer"
        @click="modalUploadPostImage.open({ postId: post?.id })"
      />
    </UTooltip>

    <div class="text-base/5 whitespace-pre-wrap">
      {{ post?.content }}
    </div>

    <div v-if="post?.description" class="px-3.5 py-2 w-fit text-sm/5 text-neutral-900 bg-warning-100 rounded-md">
      {{ post.description }}
    </div>

    <div class="flex flex-row justify-between items-center">
      <div class="flex flex-row gap-2">
        <UButton
          variant="soft"
          color="neutral"
          size="md"
          icon="i-lucide-heart"
          class="text-muted"
          label="0"
        />

        <UButton
          v-if="post?.url"
          :to="post.url"
          target="_blank"
          external
          variant="soft"
          color="neutral"
          size="md"
          icon="i-lucide-external-link"
          class="text-muted"
          label="Открыть"
        />
      </div>

      <div class="flex flex-row gap-2 items-center">
        <div class="text-muted">
          {{ status }}
        </div>

        <UButton
          variant="soft"
          color="neutral"
          size="md"
          icon="i-lucide-ellipsis-vertical"
          class="text-muted"
          @click="modalUpdatePost.open({ postId: post?.id })"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalUpdatePost, ModalUploadPostImage } from '#components'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale/ru'

const { postId } = defineProps<{ postId: string }>()

const overlay = useOverlay()
const modalUpdatePost = overlay.create(ModalUpdatePost)
const modalUploadPostImage = overlay.create(ModalUploadPostImage)

const postStore = usePostStore()
const post = computed(() => postStore.posts.find((post) => post.id === postId))

const social = computed(() => getSocialInfo(post.value?.type))
const status = computed(() => getLocalizedStatus(post.value?.status ?? ''))

function getSocialInfo(type: string | undefined) {
  switch (type) {
    case 'vk':
      return {
        icon: 'i-simple-icons:vk',
        title: 'ВКонтакте',
      }
    case 'telegram':
      return {
        icon: 'i-simple-icons:telegram',
        title: 'Telegram',
      }
    default:
      return {
        icon: '',
        title: '',
      }
  }
}

function getLocalizedStatus(status: string) {
  switch (status) {
    case 'scheduled':
      return 'Запланировано'
    case 'published':
      return 'Опубликовано'
    case 'draft':
      return 'Черновик'
    default:
      return ''
  }
}
</script>
