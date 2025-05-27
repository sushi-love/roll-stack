<template>
  <Header :title="$t('app.menu.my-space')" />

  <Content>
    <div class="flex flex-row gap-3.5">
      <UAvatar :src="user?.avatarUrl ?? undefined" class="size-16" />

      <div class="flex flex-col gap-0">
        <h2 class="text-xl md:text-2xl lg:text-3xl font-bold">
          {{ user.name }}, привет!
        </h2>
        <p class="text-lg">
          Чем займемся сегодня?
        </p>
      </div>
    </div>

    <div class="mx-0 max-w-sm min-h-92 py-4 px-4 rounded-lg border border-default">
      <div class="mb-4 flex flex-row gap-2 items-center justify-between">
        <h3 class="text-xl font-semibold">
          Список активных задач
        </h3>

        <UTooltip :text="$t('app.create.task.button')">
          <UButton
            variant="solid"
            color="secondary"
            size="md"
            icon="i-lucide-plus"
            @click="modalCreateTask.open({ performerId: user.id, chatId: undefined })"
          />
        </UTooltip>
      </div>

      <div ref="tasks" class="w-full flex flex-col gap-3">
        <TaskCard
          v-for="task in myTasks"
          :key="task.id"
          :task="task"
        />
      </div>
    </div>
  </Content>
</template>

<script setup lang="ts">
import { ModalCreateTask } from '#components'
import { useSortable } from '@vueuse/integrations/useSortable'

definePageMeta({
  middleware: ['01-auth-only'],
})

const user = useUserStore()
const taskStore = useTaskStore()

const myTasks = computed(() => taskStore.tasks.filter((task) => task.performerId === user.id))

const tasks = useTemplateRef<HTMLElement>('tasks')

useSortable(tasks, myTasks, {
  animation: 150,
})

const overlay = useOverlay()
const modalCreateTask = overlay.create(ModalCreateTask)

useHead({
  title: 'Суши Атриум',
  meta: [
    {
      name: 'description',
      content: 'Место, где бизнес-задачи превращаются в особые события.',
    },
  ],
})
</script>
