<template>
  <Header title="Пост">
    <UButton
      size="lg"
      variant="solid"
      color="secondary"
      class="w-full md:w-fit"
      icon="i-lucide-edit-2"
      label="Редактировать пост"
      @click="modalUpdatePost.open({ postId: post?.id })"
    />
  </Header>

  <Content>
    <div class="mx-auto md:w-lg flex flex-col gap-5">
      <div class="flex flex-row gap-3.5 items-center">
        <UIcon
          :name="social.icon"
          class="size-12"
          :class="social.color"
        />

        <div class="flex flex-col gap-0">
          <p class="font-semibold">
            {{ social.title }}
          </p>
          <div v-if="post?.publishAt">
            <p class="text-base text-muted">
              Будет опубликовано {{ format(new Date(post.publishAt), 'd MMMM', { locale: ru }) }} в {{ format(new Date(post.publishAt), 'HH:mm', { locale: ru }) }}
            </p>
          </div>
        </div>
      </div>

      <UTooltip :text="$t('app.update.post-photo.button')">
        <PostImage
          :media="post?.media"
          size="lg"
          class="cursor-pointer hover:scale-98 active:scale-95 duration-200"
          @click="modalUploadPostImage.open({ postId: post?.id })"
        />
      </UTooltip>

      <div class="text-base/5 whitespace-pre-wrap">
        {{ post?.content }}
      </div>

      <div v-if="post?.description" class="px-4 py-2.5 w-fit text-base/5 text-neutral-900 bg-warning-100 rounded-md">
        {{ post.description }}
      </div>

      <UButton
        v-if="post?.url"
        :to="post.url"
        target="_blank"
        external
        variant="ghost"
        color="neutral"
        size="md"
        icon="i-lucide-external-link"
        class="text-muted"
        label="Открыть"
      />

      <div class="mt-8 flex flex-row justify-between items-center">
        <div class="flex flex-row gap-2.5 items-center">
          <UTooltip v-if="!haveLikeByMe" text="Поставить лайк!">
            <UButton
              variant="subtle"
              color="neutral"
              size="lg"
              icon="i-lucide-heart"
              class="text-base text-muted"
              @click="postStore.addLike(post?.id ?? '')"
            >
              {{ post?.likes.length }}
            </UButton>
          </UTooltip>

          <UTooltip v-else text="Убрать?">
            <UButton
              variant="subtle"
              color="error"
              size="lg"
              icon="i-lucide-heart"
              class="text-base"
              @click="postStore.removeLike(post?.id ?? '')"
            >
              {{ post?.likes.length }}
            </UButton>
          </UTooltip>

          <UPopover
            mode="hover"
            :content="{
              align: 'center',
              side: 'bottom',
              sideOffset: 8,
            }"
          >
            <UAvatarGroup
              :max="4"
              size="sm"
              :ui="{
                base: '-me-3',
              }"
            >
              <UAvatar
                v-for="like in post?.likes"
                :key="like.id"
                :src="like?.user.avatarUrl ?? undefined"
                alt=""
              />
            </UAvatarGroup>

            <template #content>
              <div class="h-auto w-68 p-2 flex flex-col gap-2">
                <UButtonGroup orientation="vertical">
                  <UButton
                    v-for="like in post?.likes"
                    :key="like.id"
                    :to="`/staff/${like.user.id}`"
                    :avatar="{ src: like.user.avatarUrl ?? undefined }"
                    :ui="{
                      leadingAvatarSize: 'sm',
                    }"
                    :label="`${like.user.name} ${like.user.surname}`"
                    block
                    color="primary"
                    variant="link"
                    class="text-sm justify-start"
                  />
                </UButtonGroup>
              </div>
            </template>
          </UPopover>
        </div>

        <div>
          Тут комментарии
        </div>
      </div>

      <div>
        <FormCreateComment />
      </div>
    </div>
  </Content>
</template>

<script setup lang="ts">
import { ModalUpdatePost, ModalUploadPostImage } from '#components'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale/ru'

const { params } = useRoute('post-postId')

const userStore = useUserStore()
const postStore = usePostStore()

const post = computed(() => postStore.posts.find((post) => post.id === params.postId))
const social = computed(() => getSocialInfo(post.value?.type))

const haveLikeByMe = computed(() => post.value?.likes.find((like) => like.userId === userStore.id))

const overlay = useOverlay()
const modalUpdatePost = overlay.create(ModalUpdatePost)
const modalUploadPostImage = overlay.create(ModalUploadPostImage)
</script>
