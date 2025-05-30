<template>
  <div class="flex-1 p-4 sm:p-6 overflow-y-auto">
    <UContainer class="max-w-md">
      <template v-if="taskStore.lists.length">
        <div class="mb-6 flex flex-row gap-2 items-center justify-center">
          <UButton
            variant="solid"
            color="secondary"
            size="md"
            icon="i-lucide-plus"
            :label="$t('app.create.task.button')"
            @click="modalCreateTask.open({ performerId: undefined, listId: list?.id ?? '' })"
          />
        </div>

        <template v-if="tasks?.length">
          <div class="w-full flex flex-col gap-3">
            <TaskCard
              v-for="task in tasks"
              :key="task.id"
              :task="task"
              :full-info="true"
            />
          </div>
        </template>
        <div v-else class="flex flex-col items-center gap-3">
          <p class="text-muted text-sm">
            Задач пока нет
          </p>
        </div>
      </template>

      <div v-else class="flex flex-row items-center justify-center">
        <Loader />
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { ModalCreateTask } from '#components'
import Loader from '~/components/Loader.vue'

const { params } = useRoute('chat-chatId-tasks')

const taskStore = useTaskStore()
const list = computed(() => taskStore.lists.find((list) => list.chatId === params.chatId))
const tasks = computed(() => list.value?.tasks)

const overlay = useOverlay()
const modalCreateTask = overlay.create(ModalCreateTask)
</script>
