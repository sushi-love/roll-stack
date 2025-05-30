<template>
  <Header :title="t('common.staff')" />

  <Content>
    <div class="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div class="flex flex-col gap-2.5">
        <img
          :src="data?.avatarUrl ?? undefined"
          alt=""
          class="w-full rounded-lg"
        >

        <UButton
          v-if="canSendMessage"
          variant="solid"
          color="secondary"
          size="lg"
          label="Написать"
          icon="i-lucide-message-square-text"
          block
        />
      </div>
    </div>

    <div class="flex flex-col items-start gap-2">
      <h2 class="text-xl md:text-3xl font-bold">
        {{ data?.name }} {{ data?.surname }}
      </h2>

      <p class="text-base">
        {{ data?.caption }}
      </p>
    </div>

    <p class="text-sm text-muted">
      Описание, контакты, какие вопросы может решать, какие задачи может выполнять...
    </p>

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
    </div>
  </Content>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { params } = useRoute('staff-id')

const { data, error } = await useFetch(`/api/user/${params.id}`)
if (error.value) {
  await navigateTo('/')
}

const userStore = useUserStore()
const taskStore = useTaskStore()

const myLists = computed(() => taskStore.lists.filter((taskList) => taskList.userId === params.id))
const otherLists = computed(() => taskStore.lists.filter((taskList) => taskList.userId !== params.id))
const otherTasks = computed(() => otherLists.value.flatMap((list) => list.tasks).filter((task) => task.performerId === params.id))

const canSendMessage = computed(() => {
  return userStore.id !== data.value?.id
})

useHead({
  title: t('common.staff'),
})
</script>
