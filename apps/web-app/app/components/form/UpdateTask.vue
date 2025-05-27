<template>
  <UForm
    :validate="createValidator(updateTaskSchema)"
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

    <UFormField label="Исполнитель" name="performerId">
      <USelectMenu
        v-model="selectedPerformer"
        :items="availablePerformers"
        :avatar="selectedPerformer?.avatar"
        :placeholder="$t('common.select')"
        size="xl"
        class="w-full"
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

      <UTooltip :text="$t('app.delete.task.button')">
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
import type { UpdateTask } from '~~/shared/services/task'
import { updateTaskSchema } from '~~/shared/services/task'

const { taskId } = defineProps<{
  taskId: string
}>()

const emit = defineEmits(['success', 'submitted'])

const { t } = useI18n()
const actionToast = useActionToast()

const userStore = useUserStore()
const availablePerformers = computed(() => [{
  label: 'Без исполнителя',
  value: '',
  avatar: {
    src: undefined,
    alt: '',
  },
}, ...userStore.staff.map((staff) => ({
  label: `${staff.name} ${staff.surname}`,
  value: staff.id,
  avatar: {
    src: staff.avatarUrl ?? undefined,
    alt: '',
  },
}))])

const taskStore = useTaskStore()
const task = computed(() => taskStore.tasks.find((task) => task.id === taskId))

const state = ref<Partial<UpdateTask>>({
  name: task.value?.name,
  description: task.value?.description ?? undefined,
  performerId: task.value?.performerId,
})

const selectedPerformer = ref<{ label: string, value: string, avatar: { src: string | undefined, alt: string } } | undefined>(state.value.performerId ? availablePerformers.value.find((performer) => performer?.value === state.value.performerId) : undefined)

watch(selectedPerformer, () => {
  if (selectedPerformer.value?.value === '') {
    state.value.performerId = null
    return
  }

  state.value.performerId = selectedPerformer.value?.value
})

async function onSubmit(event: FormSubmitEvent<UpdateTask>) {
  const toastId = actionToast.start()
  emit('submitted')

  try {
    await $fetch(`/api/task/id/${taskId}`, {
      method: 'PATCH',
      body: event.data,
    })

    await taskStore.update()

    actionToast.success(toastId, t('toast.task-updated'))
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
    await $fetch(`/api/task/id/${taskId}`, {
      method: 'DELETE',
    })

    await taskStore.update()

    actionToast.success(toastId, t('toast.task-deleted'))
    emit('success')
  } catch (error) {
    console.error(error)
    actionToast.error(toastId)
  }
}
</script>
