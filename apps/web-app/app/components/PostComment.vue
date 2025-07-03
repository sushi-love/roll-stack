<template>
  <article class="group/message relative w-full scroll-mt-4 sm:scroll-mt-6">
    <div class="relative flex items-start gap-2 pb-2 rtl:justify-end">
      <div class="inline-flex items-center justify-center min-h-6 mt-1.5">
        <UserPopover :user="user">
          <UAvatar :src="user?.avatarUrl ?? ''" class="hover:scale-110 duration-200" />
        </UserPopover>
      </div>

      <div class="min-h-12 min-w-18 relative bg-elevated/50 px-3.5 py-2 rounded-lg md:max-w-[85%] lg:max-w-[70%] ring ring-default">
        <div class="text-sm/5 md:text-base/5 whitespace-break-spaces text-pretty font-semibold">
          {{ comment?.text }}
        </div>

        <div class="mt-0.5 flex justify-end text-xs text-dimmed">
          {{ format(new Date(comment?.createdAt ?? ''), 'HH:mm') }}
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { format } from 'date-fns'

const { postId, commentId } = defineProps<{
  postId: string
  commentId: string
}>()

const postStore = usePostStore()
const userStore = useUserStore()

const post = computed(() => postStore.posts.find((post) => post.id === postId))
const comment = computed(() => post.value?.comments.find((comment) => comment.id === commentId))
const user = computed(() => userStore.find(comment.value?.userId ?? ''))
</script>
