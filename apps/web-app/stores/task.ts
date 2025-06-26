import type { Task, TaskList } from '@sushi-atrium/database'

type TaskListWithTasks = TaskList & {
  tasks: Task[]
}

export const useTaskStore = defineStore('task', () => {
  const lists = ref<TaskListWithTasks[]>([])
  const isTodayOnly = ref(false)

  async function update() {
    try {
      const data = await $fetch('/api/task/list', {
        lazy: true,
        server: true,
        cache: 'no-cache',
        getCachedData: undefined,
      })
      if (!data) {
        return
      }

      lists.value = data
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          // No session
        }
        if (error.message.includes('404')) {
          // Not found
        }
      }
    }
  }

  async function setAsFocused(taskId: string) {
    try {
      await $fetch(`/api/task/id/${taskId}/focus`, {
        method: 'POST',
      })
    } catch (error) {
      console.error(error)
    }
  }

  async function setAsUnfocused(taskId: string) {
    try {
      await $fetch(`/api/task/id/${taskId}/focus`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.error(error)
    }
  }

  return {
    lists,
    isTodayOnly,

    update,
    setAsFocused,
    setAsUnfocused,
  }
})
