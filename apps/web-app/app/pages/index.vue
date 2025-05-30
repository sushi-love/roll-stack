<template>
  <Header :title="$t('app.menu.my-space')" />

  <Content>
    <template v-if="user.id">
      <div class="flex flex-row gap-3.5">
        <UAvatar :src="user?.avatarUrl ?? undefined" class="size-16" />

        <div class="flex flex-col gap-0">
          <h2 class="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">
            {{ user.name }}, привет!
          </h2>
          <p class="text-lg">
            Чем займемся сегодня?
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TaskList
          v-for="taskList in myLists"
          :key="taskList.id"
          :list-id="taskList.id"
          :is-private="true"
        />
        <TaskPerformerList
          :tasks="otherTasks"
          :is-private="true"
        />

        <CreateCard
          :label="$t('app.create.task-list.button')"
          icon="i-lucide-list-todo"
          @click="modalCreateTaskList.open({ userId: user.id })"
        />
      </div>
    </template>

    <template v-else>
      <Loader />
    </template>
  </Content>
</template>

<script setup lang="ts">
import { ModalCreateTaskList } from '#components'

definePageMeta({
  middleware: ['01-auth-only'],
})

const overlay = useOverlay()
const modalCreateTaskList = overlay.create(ModalCreateTaskList)

const user = useUserStore()
const taskStore = useTaskStore()

const myLists = computed(() => taskStore.lists.filter((taskList) => taskList.userId === user.id))
const otherLists = computed(() => taskStore.lists.filter((taskList) => taskList.userId !== user.id))
const otherTasks = computed(() => otherLists.value.flatMap((list) => list.tasks).filter((task) => task.performerId === user.id))

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
