<template>
  <UForm
    :validate="createValidator(createChatSchema)"
    :state="state"
    class="flex flex-col gap-3"
    @submit="onSubmit"
  >
    <UFormField :label="$t('common.title')" name="name">
      <UInput
        v-model="state.name"
        size="xl"
        class="w-full items-center justify-center"
      />
    </UFormField>

    <UFormField :label="$t('common.short-description')" name="description">
      <UInput
        v-model="state.description"
        placeholder="Для чего создан и что в нем будет обсуждаться"
        size="xl"
        class="w-full items-center justify-center"
      />
    </UFormField>

    <UFormField label="Участники" name="members">
      <USelectMenu
        v-model="selectedMembers"
        :items="availableMembers"
        :avatar="selectedMembers[0]?.avatar"
        :placeholder="$t('common.select')"
        multiple
        size="xl"
        class="w-full"
      />
    </UFormField>

    <UButton
      type="submit"
      variant="solid"
      color="secondary"
      size="xl"
      block
      class="mt-3"
      :label="$t('common.create')"
    />
  </UForm>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { CreateChat } from '~~/shared/services/chat'
import { createChatSchema } from '~~/shared/services/chat'

type FormMember = { label: string, value: string, avatar: { src: string | undefined, alt: string } }

const emit = defineEmits(['success', 'submitted'])

const { t } = useI18n()
const actionToast = useActionToast()
const chatStore = useChatStore()
const userStore = useUserStore()
const taskStore = useTaskStore()

const state = ref<Partial<CreateChat>>({
  name: undefined,
  description: undefined,
  usersId: [userStore.id as string],
})

const availableMembers = computed(() => [...userStore.staff.map((staff) => ({
  label: `${staff.name} ${staff.surname}`,
  value: staff.id,
  avatar: {
    src: staff.avatarUrl ?? undefined,
    alt: '',
  },
}))])
const selectedMembers = ref<FormMember[]>([availableMembers.value.find((member) => member.value === userStore.id) as FormMember])

watch(selectedMembers, () => {
  state.value.usersId = selectedMembers.value.map((member) => member.value)
})

async function onSubmit(event: FormSubmitEvent<CreateChat>) {
  const toastId = actionToast.start()
  emit('submitted')

  try {
    await $fetch('/api/chat', {
      method: 'POST',
      body: event.data,
    })

    await chatStore.update()
    await userStore.update()
    await taskStore.update()

    actionToast.success(toastId, t('toast.chat-created'))
    emit('success')
  } catch (error) {
    console.error(error)
    actionToast.error(toastId)
  }
}
</script>
