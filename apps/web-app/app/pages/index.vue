<template>
  <Header :title="$t('app.menu.my-space')">
    <UsersOnline />
  </Header>

  <Content>
    <template v-if="userStore.id">
      <div class="flex flex-col lg:flex-row gap-2 items-center justify-between">
        <div class="flex flex-row gap-3.5 items-center">
          <UTooltip :text="$t('app.update.user-photo.button')">
            <UAvatar
              :src="userStore?.avatarUrl ?? undefined"
              class="size-18 cursor-pointer hover:scale-95 active:scale-90 duration-200"
              @click="modalUploadUserAvatar.open()"
            />
          </UTooltip>

          <div class="flex flex-col gap-0">
            <h2 class="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">
              {{ userStore.name }}, привет!
            </h2>
            <p class="text-lg">
              Чем займемся сегодня?
            </p>
          </div>
        </div>

        <TasksTodaySwitch />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TaskPerformerList
          :tasks="otherTasks"
          :is-private="true"
        />
        <TaskList
          v-for="taskList in myLists"
          :key="taskList.id"
          :list-id="taskList.id"
          :is-private="true"
        />

        <CreateCard
          :label="$t('app.create.task-list.button')"
          icon="i-lucide-list-todo"
          @click="modalCreateTaskList.open({ userId: userStore.id })"
        />
      </div>
    </template>

    <template v-else>
      <Loader />
    </template>
  </Content>
</template>

<script setup lang="ts">
import { ModalCreateTaskList, ModalUploadUserAvatar } from '#components'

definePageMeta({
  middleware: ['01-auth-only'],
})

const overlay = useOverlay()
const modalCreateTaskList = overlay.create(ModalCreateTaskList)
const modalUploadUserAvatar = overlay.create(ModalUploadUserAvatar)

const userStore = useUserStore()
const taskStore = useTaskStore()

const myLists = computed(() => taskStore.lists.filter((taskList) => taskList.userId === userStore.id))
const otherLists = computed(() => taskStore.lists.filter((taskList) => taskList.userId !== userStore.id))
const otherTasks = computed(() => otherLists.value.flatMap((list) => list.tasks).filter((task) => task.performerId === userStore.id))

let interval: NodeJS.Timeout

onMounted(async () => {
  await Promise.all([
    userStore.updateOnline(),
    userStore.update(),
  ])

  interval = setInterval(async () => {
    await Promise.all([
      userStore.updateOnline(),
      userStore.update(),
    ])
  }, 45000)
})

onUnmounted(() => {
  clearInterval(interval)
})

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
