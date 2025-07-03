<template>
  <UForm
    :validate="createValidator(createTaskListSchema)"
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
import type { CreateTaskList } from '~~/shared/services/task'
import { createTaskListSchema } from '~~/shared/services/task'

const { chatId } = defineProps<{
  chatId?: string
}>()

const emit = defineEmits(['success', 'submitted'])

const { t } = useI18n()
const actionToast = useActionToast()

const taskStore = useTaskStore()

const state = ref<Partial<CreateTaskList>>({
  name: undefined,
  chatId,
})

async function onSubmit(event: FormSubmitEvent<CreateTaskList>) {
  const toastId = actionToast.start()
  emit('submitted')

  try {
    await $fetch(`/api/task/list`, {
      method: 'POST',
      body: event.data,
    })

    await taskStore.update()

    actionToast.success(toastId, t('toast.task-list-created'))
    emit('success')
  } catch (error) {
    console.error(error)
    actionToast.error(toastId)
  }
}
</script>
