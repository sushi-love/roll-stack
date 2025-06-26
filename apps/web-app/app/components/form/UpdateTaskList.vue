<template>
  <UForm
    :validate="createValidator(updateTaskListSchema)"
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

    <div class="mt-3 flex flex-row gap-3">
      <UButton
        type="submit"
        variant="solid"
        color="secondary"
        size="xl"
        block
        :label="$t('common.update')"
      />

      <UTooltip :text="$t('app.delete.task-list.button')">
        <UButton
          variant="soft"
          color="error"
          size="xl"
          icon="i-lucide-trash-2"
          class="aspect-square justify-center"
          @click="onDelete"
        />
      </UTooltip>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { UpdateTaskList } from '~~/shared/services/task'
import { updateTaskListSchema } from '~~/shared/services/task'

const { listId } = defineProps<{
  listId: string
}>()

const emit = defineEmits(['success', 'submitted'])

const { t } = useI18n()
const actionToast = useActionToast()

const taskStore = useTaskStore()
const list = computed(() => taskStore.lists.find((list) => list.id === listId))

const state = ref<Partial<UpdateTaskList>>({
  name: list.value?.name,
})

async function onSubmit(event: FormSubmitEvent<UpdateTaskList>) {
  const toastId = actionToast.start()
  emit('submitted')

  try {
    await $fetch(`/api/task/list/id/${listId}`, {
      method: 'PATCH',
      body: event.data,
    })

    await taskStore.update()

    actionToast.success(toastId, t('toast.task-list-updated'))
    emit('success')
  } catch (error) {
    console.error(error)
    actionToast.error(toastId)
  }
}

async function onDelete() {
  const toastId = actionToast.start()
  emit('submitted')

  try {
    await $fetch(`/api/task/list/id/${listId}`, {
      method: 'DELETE',
    })

    await taskStore.update()

    actionToast.success(toastId, t('toast.task-list-deleted'))
    emit('success')
  } catch (error) {
    console.error(error)
    actionToast.error(toastId)
  }
}
</script>
