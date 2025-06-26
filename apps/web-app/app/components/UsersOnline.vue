<template>
  <div class="flex flex-row gap-1.5">
    <div
      v-for="user in onlineUsers"
      :key="user.id"
      class="relative"
    >
      <UAvatar
        :src="user?.avatarUrl ?? undefined"
        class="size-10"
      />

      <div v-if="user.tasksCompletedToday" class="absolute -bottom-1 -right-1">
        <div class="relative size-6">
          <UIcon name="fluent:heart-32-filled" class="size-6 text-(--ui-bg)" />
          <div class="text-highlighted text-xs font-bold absolute bottom-1 right-1/3">
            {{ user.tasksCompletedToday }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const taskStore = useTaskStore()

const onlineUsers = computed(() => userStore.staff.filter(
  (staff) => {
    const onlineInterval = 3 * 60 * 1000
    const isOnline = new Date(staff.onlineAt ?? '').getTime() > Date.now() - onlineInterval
    const notMe = staff.id !== userStore.id

    return isOnline && notMe
  }).map((staff) => {
  const userTasks = taskStore.lists.flatMap((list) => list.tasks).filter((task) => task.performerId === staff.id)

  return {
    id: staff.id,
    avatarUrl: staff.avatarUrl,
    tasksCompletedToday: userTasks.filter((task) => task.completedAt).length,
  }
}),
)
</script>
