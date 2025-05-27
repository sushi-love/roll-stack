<template>
  <UForm
    :validate="createValidator(createTaskSchema)"
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

    <UFormField :label="$t('app.task.description')" name="description">
      <UTextarea
        v-model="state.description"
        :rows="4"
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
import type { CreateTask } from '~~/shared/services/task'
import { createTaskSchema } from '~~/shared/services/task'

const { performerId, chatId } = defineProps<{
  performerId?: string
  chatId?: string
}>()

const emit = defineEmits(['success', 'submitted'])

const { t } = useI18n()
const actionToast = useActionToast()

const taskStore = useTaskStore()

const state = ref<Partial<CreateTask>>({
  name: undefined,
  description: undefined,
  performerId,
  chatId,
})

async function onSubmit(event: FormSubmitEvent<CreateTask>) {
  const toastId = actionToast.start()
  emit('submitted')

  try {
    await $fetch(`/api/task`, {
      method: 'POST',
      body: event.data,
    })

    await taskStore.update()

    actionToast.success(toastId, t('toast.task-created'))
    emit('success')
  } catch (error) {
    console.error(error)
    actionToast.error(toastId)
  }
}
</script>
