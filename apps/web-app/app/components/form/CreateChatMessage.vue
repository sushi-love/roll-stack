<template>
  <UCard
    variant="subtle"
    class="mt-auto bg-elevated/25"
    :ui="{ body: '!p-4' }"
  >
    <div v-if="!user.id" class="flex flex-row items-center justify-center">
      <Loader />
    </div>

    <UForm
      v-else
      :state="state"
      class="flex flex-col gap-3"
      @submit="onSubmit"
    >
      <UFormField name="text">
        <UTextarea
          v-model="state.text"
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
      </UFormField>

      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <UAvatar
            :src="user.avatarUrl ?? undefined"
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
          icon="i-lucide-send"
          :loading="loading"
          :disabled="!state.text"
          :label="$t('common.send')"
        />
      </div>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { CreateChatMessage } from '~~/shared/services/chat'

const { chatId } = defineProps<{
  chatId: string
}>()

const toast = useToast()
const user = useUserStore()
const chatStore = useChatStore()

const loading = ref(false)

const state = ref<Partial<CreateChatMessage>>({
  text: undefined,
})

function resetState() {
  state.value = {
    text: undefined,
  }
}

async function onSubmit(event: FormSubmitEvent<CreateChatMessage>) {
  loading.value = true

  try {
    await $fetch(`/api/chat/id/${chatId}/message`, {
      method: 'POST',
      body: event.data,
    })

    await chatStore.update()

    resetState()
  } catch (error) {
    console.error(error)

    toast.add({
      title: 'Ошибка!',
      description: 'Добавить сообщение не удалось. Попробуйте еще раз.',
      icon: 'i-lucide-x',
      color: 'error',
    })
  } finally {
    loading.value = false
  }
}
</script>
