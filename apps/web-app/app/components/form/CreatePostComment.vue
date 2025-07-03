<template>
  <UCard
    variant="subtle"
    class="mt-auto bg-elevated/25"
    :ui="{ body: '!p-4' }"
  >
    <div v-if="!userStore.id" class="text-center text-muted">
      <Loader />
    </div>
    <form
      v-else
      class="flex flex-col gap-4"
      @submit.prevent="onCommentSubmit"
    >
      <UTextarea
        v-model="text"
        color="neutral"
        variant="none"
        required
        autoresize
        placeholder="Напишите свою мысль..."
        :rows="3"
        :disabled="loading"
        class="w-full"
        :ui="{ base: 'p-0 resize-none text-lg leading-6' }"
      />

      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <UAvatar
            :src="userStore.avatarUrl ?? undefined"
            alt=""
            class="size-8"
          />
          <p class="text-sm font-semibold">
            {{ userStore.name }}
          </p>
        </div>

        <UButton
          type="submit"
          color="secondary"
          size="lg"
          :loading="loading"
          :disabled="!text"
          label="Добавить комментарий"
          icon="i-lucide-send"
        />
      </div>
    </form>
  </UCard>
</template>

<script setup lang="ts">
const { postId } = defineProps<{ postId: string }>()

const userStore = useUserStore()
const postStore = usePostStore()

const text = ref('')
const loading = ref(false)

async function onCommentSubmit() {
  loading.value = true

  await postStore.addComment(postId, text.value)

  text.value = ''
  loading.value = false
}
</script>
