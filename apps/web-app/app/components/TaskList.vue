<template>
  <div class="p-4 rounded-lg border border-default group/list">
    <div class="mb-4 flex flex-row gap-2 items-center justify-between">
      <h3 class="text-xl/6 font-bold">
        {{ list?.name }}
      </h3>

      <div v-if="isPrivate" class="flex flex-row gap-2">
        <UTooltip :text="`Редактировать список «${list?.name}»`">
          <UButton
            variant="outline"
            color="neutral"
            size="md"
            icon="i-lucide-pencil"
            class="opacity-0 group-hover/list:opacity-100"
            @click="modalUpdateTaskList.open({ listId })"
          />
        </UTooltip>

        <UTooltip :text="`${$t('app.create.task.button')} в списке «${list?.name}»`">
          <UButton
            variant="solid"
            color="secondary"
            size="md"
            icon="i-lucide-plus"
            @click="modalCreateTask.open({ performerId: isPrivate ? userStore.id : undefined, listId })"
          />
        </UTooltip>
      </div>
    </div>

    <div
      v-if="tasks.length"
      class="w-full flex flex-col gap-3"
    >
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
      />
    </div>
    <template v-else>
      <p class="text-base text-dimmed">
        Список пуст
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ModalCreateTask, ModalUpdateTaskList } from '#components'
import { getLocalTimeZone, isToday, parseDate } from '@internationalized/date'

const { listId } = defineProps<{
  listId: string
  isPrivate: boolean
}>()

const userStore = useUserStore()
const taskStore = useTaskStore()

const list = computed(() => taskStore.lists.find((list) => list.id === listId))
const tasks = computed(() => list.value?.tasks.filter((t) => {
  // Need to show only with today date or completed today
  if (taskStore.isTodayOnly) {
    return t.date
      ? t.completedAt || isToday(parseDate(t.date), getLocalTimeZone())
      : false
  }

  return true
}) || [])

const isPrivate = computed(() => list.value?.userId === userStore.id)

const overlay = useOverlay()
const modalCreateTask = overlay.create(ModalCreateTask)
const modalUpdateTaskList = overlay.create(ModalUpdateTaskList)
</script>
