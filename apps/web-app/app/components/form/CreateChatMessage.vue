<template>
  <UCard
    variant="subtle"
    class="mt-auto bg-elevated/25"
    :ui="{ body: '!p-4' }"
  >
    <div v-if="!user.id" class="text-center text-muted">
      <ULink to="/sign-in">
        Необходимо авторизоваться
      </ULink> чтобы оставить комментарий
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
        placeholder="Напишите свое сообщение..."
        :rows="3"
        :disabled="loading"
        class="w-full"
        :ui="{ base: 'p-0 resize-none text-lg leading-6' }"
      />

      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <UAvatar
            :src="user.avatar ?? undefined"
            alt=""
            class="size-8"
          />
          <p class="text-sm font-semibold">
            {{ user.fullName }}
          </p>
        </div>

        <UButton
          type="submit"
          color="secondary"
          size="lg"
          :loading="loading"
          :disabled="!text"
          label="Отправить"
          icon="i-lucide-send"
        />
      </div>
    </form>
  </UCard>
</template>

<script setup lang="ts">
const toast = useToast()
const user = useUserStore()

const text = ref('')
const loading = ref(false)

function onCommentSubmit() {
  loading.value = true

  setTimeout(() => {
    text.value = ''

    toast.add({
      title: 'Комментарий добавлен!',
      description: 'Сейчас он появится на странице.',
      icon: 'i-lucide-check-circle',
      color: 'success',
    })

    loading.value = false
  }, 1000)
}
</script>
