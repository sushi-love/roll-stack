<template>
  <div class="p-4 rounded-lg border border-default">
    <div class="mb-4 flex flex-row gap-2 items-center justify-between">
      <h3 class="text-xl font-bold">
        Исполнитель
      </h3>
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
import type { Task } from '@sushi-atrium/database'
import { useSortable } from '@vueuse/integrations/useSortable'

const { tasks } = defineProps<{
  tasks: Task[]
  isPrivate: boolean
}>()

const tasksRef = useTemplateRef<HTMLElement>('tasks')

useSortable(tasksRef, tasks, {
  animation: 150,
})
</script>
