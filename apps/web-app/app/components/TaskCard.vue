<template>
  <div class="w-full flex flex-row items-start gap-2">
    <UTooltip text="Задача выполнена?">
      <UCheckbox
        color="secondary"
        variant="list"
        size="xl"
        class="mt-1.5 hover:scale-115 duration-200"
        :class="{
          'motion-preset-bounce': checkboxClicked,
        }"
        @change="checkboxClicked = !checkboxClicked"
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
          'text-neutral-900 bg-info-100 border-b-2 border-l-2 border-info-200 hover:bg-info-200': isFocused,
        }"
      >
        <div class="flex flex-col gap-2 items-start">
          <div class="flex flex-col gap-1 items-start text-left">
            <h4 class="text-lg font-medium leading-5 line-clamp-3">
              {{ task.name }}
            </h4>
            <p v-if="task.description" class="text-sm text-muted leading-4 line-clamp-2">
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
import { ModalUpdateTask } from '#components'

const { task } = defineProps<{
  task: Task
  fullInfo?: boolean
}>()

const { t } = useI18n()
const actionToast = useActionToast()
const taskStore = useTaskStore()
const userStore = useUserStore()
const chatStore = useChatStore()

const overlay = useOverlay()
const modalUpdateTask = overlay.create(ModalUpdateTask)

const canFocus = computed(() => task.performerId === userStore.id)
const isFocused = computed(() => task.id === userStore.staff.find((staff) => staff.id === task.performerId)?.focusedTaskId)

const checkboxClicked = ref(false)

const items = computed<DropdownMenuItem[]>(() => {
  const arr = [
    [
      {
        label: 'Редактировать',
        icon: 'i-lucide-edit',
        onClick: () => modalUpdateTask.open({ taskId: task.id }),
      },
      {
        label: 'Удалить',
        icon: 'i-lucide-trash-2',
        color: 'error',
        onClick: onDelete,
      },
    ]]

  // Push to the start of arr
  canFocus.value && arr.unshift([{
    label: isFocused.value ? 'Убрать фокус' : 'Сфокусироваться',
    icon: 'i-lucide-goal',
    color: 'neutral',
    onClick: isFocused.value ? onUnfocus : onFocus,
  }])

  task.chatId && arr.unshift([{
    label: 'Перейти в чат',
    icon: 'i-lucide-messages-square',
    color: 'neutral',
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
</script>
