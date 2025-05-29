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

      <p class="text-md">
        {{ data?.caption }}
      </p>
    </div>

    <p class="text-sm text-muted">
      Описание, контакты, какие вопросы может решать, какие задачи может выполнять...
    </p>

    <div class="mx-0 max-w-sm py-4 px-4 rounded-lg border border-default">
      <div class="mb-4 flex flex-row gap-2 items-center justify-between">
        <h3 class="text-xl font-semibold">
          Список активных задач
        </h3>
      </div>

      <div class="w-full h-full flex flex-col gap-3">
        <TaskCard
          v-for="task in tasks"
          :key="task.id"
          :task="task"
        />
      </div>
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

const tasks = computed(() => taskStore.tasks.filter((task) => task.performerId === data.value?.id))

const canSendMessage = computed(() => {
  return userStore.id !== data.value?.id
})

useHead({
  title: t('common.staff'),
})
</script>
