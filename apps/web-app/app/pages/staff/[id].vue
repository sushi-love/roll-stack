<template>
  <Header :title="t('common.staff')" />

  <Content>
    <template v-if="taskStore.lists.length">
      <div class="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div class="flex flex-col gap-2.5">
          <img
            :src="data?.avatarUrl ?? undefined"
            alt=""
            class="w-full rounded-lg"
          >
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

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TaskList
          v-for="taskList in myLists"
          :key="taskList.id"
          :list-id="taskList.id"
          :current-user-id="params.id"
        />
      </div>
    </template>

    <template v-else>
      <Loader />
    </template>
  </Content>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { params } = useRoute('staff-id')

const { data, error } = await useFetch(`/api/user/id/${params.id}`)
if (error.value) {
  await navigateTo('/')
}

const taskStore = useTaskStore()

const myLists = computed(() => taskStore.lists.filter((taskList) => taskList.chat?.members.some((member) => member.userId === params.id)))

useHead({
  title: t('common.staff'),
})
</script>
