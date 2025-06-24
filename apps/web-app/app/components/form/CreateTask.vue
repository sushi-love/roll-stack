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

    <div class="grid grid-cols-1 md:grid-cols-2">
      <UPopover>
        <UFormField :label="$t('common.date')" name="date">
          <UInput
            :value="selectedDate ? df.format(selectedDate.toDate(getLocalTimeZone())) : ''"
            placeholder="Выберите дату"
            size="xl"
            class="w-full items-center justify-center cursor-pointer"
            :ui="{ trailing: 'pe-1.5' }"
          >
            <template v-if="selectedDate" #trailing>
              <UButton
                color="neutral"
                variant="ghost"
                size="md"
                icon="i-lucide-x"
                @click="selectedDate = undefined"
              />
            </template>
          </UInput>
        </UFormField>

        <template #content>
          <UCalendar v-model="selectedDate" class="p-2" />
        </template>
      </UPopover>
    </div>

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
import type { CalendarDate } from '@internationalized/date'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { CreateTask } from '~~/shared/services/task'
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { createTaskSchema } from '~~/shared/services/task'

const { performerId, listId } = defineProps<{
  performerId?: string
  listId: string
}>()

const emit = defineEmits(['success', 'submitted'])

const { t } = useI18n()
const actionToast = useActionToast()

const taskStore = useTaskStore()

const state = ref<Partial<CreateTask>>({
  name: undefined,
  description: undefined,
  date: undefined,
  performerId,
  listId,
})

const df = new DateFormatter('ru-RU', {
  dateStyle: 'long',
})

const selectedDate = shallowRef<CalendarDate | undefined>()

watch(selectedDate, () => {
  if (!selectedDate.value) {
    state.value.date = null
    return
  }

  state.value.date = selectedDate.value.toString()
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
