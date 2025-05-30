<template>
  <div class="p-4 rounded-lg border border-default">
    <div class="mb-4 flex flex-row gap-2 items-center justify-between">
      <h3 class="text-xl font-bold">
        {{ list?.name }}
      </h3>

      <UTooltip :text="$t('app.create.task.button')">
        <UButton
          variant="solid"
          color="secondary"
          size="md"
          icon="i-lucide-plus"
          @click="modalCreateTask.open({ performerId: isPrivate ? userStore.id : undefined, listId })"
        />
      </UTooltip>
    </div>

    <div
      v-if="tasks.length"
      ref="tasksRef"
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
        Тут пока пусто
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ModalCreateTask } from '#components'
import { useSortable } from '@vueuse/integrations/useSortable'

const { listId } = defineProps<{
  listId: string
  isPrivate: boolean
}>()

const userStore = useUserStore()
const taskStore = useTaskStore()

const list = computed(() => taskStore.lists.find((list) => list.id === listId))
const tasks = computed(() => list.value?.tasks || [])

const tasksRef = useTemplateRef<HTMLElement>('tasks')

useSortable(tasksRef, tasks, {
  animation: 150,
})

const overlay = useOverlay()
const modalCreateTask = overlay.create(ModalCreateTask)
</script>
