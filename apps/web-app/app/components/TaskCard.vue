<template>
  <div class="w-full flex flex-row items-start gap-2">
    <template v-if="isCompleted">
      <UIcon name="i-lucide-check" class="mt-1.5 size-6 text-secondary" />
    </template>
    <UTooltip v-else text="Задача выполнена?">
      <UCheckbox
        v-model="checkbox"
        color="secondary"
        variant="list"
        size="xl"
        icon="i-lucide-check"
        class="mt-1.5 hover:scale-115 duration-200 motion-preset-bounce"
        @change="onStartCompleting"
      />
    </UTooltip>

    <UDropdownMenu
      :items="items"
      :ui="{
        content: 'w-48',
      }"
    >
      <UButton
        color="neutral"
        variant="ghost"
        :trailing-icon="isFocused ? 'i-lucide-goal' : 'i-lucide-ellipsis-vertical'"
        block
        :ui="{
          trailingIcon: [
            'self-start mt-0.5 text-dimmed',
            isFocused ? 'text-info' : undefined,
          ],
        }"
        :class="{
          'group text-neutral-900 bg-info-100 border-b-2 border-l-2 border-info-200 hover:bg-info-200 duration-200': isFocused,
        }"
      >
        <div class="flex flex-col gap-2 items-start">
          <div class="flex flex-col gap-1 items-start text-left">
            <h4 class="text-lg font-medium leading-5 line-clamp-3">
              {{ task.name }}
            </h4>
            <p v-if="task.description" class="text-sm text-muted leading-4 line-clamp-2 group-hover:line-clamp-5">
              {{ task.description }}
            </p>
          </div>

          <template v-if="!fullInfo && task.chatId">
            <UBadge
              color="neutral"
              variant="outline"
              icon="i-lucide-messages-square"
              :ui="{
                leadingIcon: 'text-dimmed',
              }"
            >
              {{ chatStore.find(task.chatId)?.name }}
            </UBadge>
          </template>

          <template v-if="fullInfo">
            <UBadge
              v-if="task.performerId"
              color="neutral"
              variant="outline"
              icon="i-lucide-user"
              :ui="{
                leadingIcon: 'text-dimmed',
              }"
            >
              {{ userStore.staff.find((staff) => staff.id === task.performerId)?.name }}
              {{ userStore.staff.find((staff) => staff.id === task.performerId)?.surname }}
            </UBadge>
          </template>
        </div>
      </UButton>
    </UDropdownMenu>
  </div>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import type { Task } from '@sushi-atrium/database'
import { ModalCompleteTask, ModalUpdateTask } from '#components'

const { task } = defineProps<{
  task: Task
  fullInfo?: boolean
}>()

const { t } = useI18n()
const toast = useToast()
const actionToast = useActionToast()
const taskStore = useTaskStore()
const userStore = useUserStore()
const chatStore = useChatStore()

const overlay = useOverlay()
const modalUpdateTask = overlay.create(ModalUpdateTask)
const modalCompleteTask = overlay.create(ModalCompleteTask)

const isCompleted = computed(() => !!task.completedAt)

const canFocus = computed(() => task.performerId === userStore.id && !isCompleted.value)
const isFocused = computed(() => task.id === userStore.staff.find((staff) => staff.id === task.performerId)?.focusedTaskId)

const checkbox = ref(false)
const toastId = ref(`task-close-${task.id}`)

const items = computed<DropdownMenuItem[]>(() => {
  const arr = [
    [
      {
        label: 'Редактировать',
        icon: 'i-lucide-edit',
        disabled: isCompleted.value,
        onClick: () => modalUpdateTask.open({ taskId: task.id }),
      },
      {
        label: 'Удалить',
        icon: 'i-lucide-trash-2',
        color: 'error',
        disabled: isCompleted.value,
        onClick: onDelete,
      },
    ]]

  // Push to the start of arr
  canFocus.value && arr.unshift([{
    label: isFocused.value ? 'Убрать фокус' : 'Сфокусироваться',
    icon: 'i-lucide-goal',
    color: 'neutral',
    disabled: false,
    onClick: isFocused.value ? onUnfocus : onFocus,
  }])

  task.chatId && arr.unshift([{
    label: 'Перейти в чат',
    icon: 'i-lucide-messages-square',
    color: 'neutral',
    disabled: false,
    onClick: goToChat,
  }])

  return arr
})

async function goToChat() {
  await navigateTo(`/chat/${task.chatId}`)
}

async function onFocus() {
  const toastId = actionToast.start()

  try {
    await taskStore.setAsFocused(task.id)
    await taskStore.update()
    await userStore.update()
    await userStore.updateUsers()

    actionToast.success(toastId, t('toast.task-focused'))
  } catch (error) {
    console.error(error)
    actionToast.error(toastId)
  }
}

async function onUnfocus() {
  const toastId = actionToast.start()

  try {
    await taskStore.setAsUnfocused(task.id)
    await taskStore.update()
    await userStore.update()
    await userStore.updateUsers()

    actionToast.success(toastId, t('toast.task-unfocused'))
  } catch (error) {
    console.error(error)
    actionToast.error(toastId)
  }
}

async function onDelete() {
  const toastId = actionToast.start()

  try {
    await $fetch(`/api/task/id/${task.id}`, {
      method: 'DELETE',
    })

    await taskStore.update()

    actionToast.success(toastId, t('toast.task-deleted'))
  } catch (error) {
    console.error(error)
    actionToast.error(toastId)
  }
}

function onStartCompleting() {
  if (!checkbox.value) {
    return
  }

  modalCompleteTask.open({ taskId: task.id })

  checkbox.value = false

  toast.add({
    id: toastId.value,
    title: 'Закрываем задачу?',
    description: 'Сразу как успешную или есть что добавить? Заполните форму.',
    color: 'secondary',
    type: 'foreground',
    duration: 5000,
  })
}
</script>
