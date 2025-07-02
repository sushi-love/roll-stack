<template>
  <div class="flex flex-row gap-1.5">
    <div
      v-for="user in onlineUsers"
      :key="user.id"
      class="relative"
    >
      <UTooltip :text="`${user.name} ${user.surname} онлайн. Задач выполнено сегодня: ${user.tasksCompletedToday}`">
        <UAvatar
          :src="user?.avatarUrl ?? undefined"
          class="size-10 border-2 border-secondary"
        />

        <div v-if="user.tasksCompletedToday" class="absolute -bottom-1.5 -right-1.5">
          <div class="relative size-6">
            <UIcon name="fluent:heart-32-filled" class="size-5 text-secondary" />
            <div class="text-white text-xs font-bold absolute bottom-1.5 right-2.5">
              {{ user.tasksCompletedToday }}
            </div>
          </div>
        </div>
      </UTooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const taskStore = useTaskStore()

const onlineUsers = computed(() => userStore.staff
  .filter((staff) => {
    const onlineInterval = 3 * 60 * 1000
    const isOnline = new Date(staff.onlineAt ?? '').getTime() > Date.now() - onlineInterval
    const notMe = true // staff.id !== userStore.id

    return isOnline && notMe
  })
  .map((staff) => {
    const userTasks = taskStore.lists.flatMap((list) => list.tasks).filter((task) => task.performerId === staff.id)

    return {
      id: staff.id,
      avatarUrl: staff.avatarUrl,
      name: staff.name,
      surname: staff.surname,
      tasksCompletedToday: userTasks.filter((task) => task.completedAt).length,
    }
  })
  .sort((a, b) => b.tasksCompletedToday - a.tasksCompletedToday))
</script>
