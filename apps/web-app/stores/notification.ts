import type { Notification, Task, User } from '@sushi-atrium/database'

type NotificationWithEntities = Notification & {
  task: Task | null
}

type NotificationWithTask = Notification & {
  task: (Task & {
    performer: User
  })
}

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<NotificationWithEntities[]>([])

  const interval = ref<NodeJS.Timeout | undefined>(undefined)
  const toastContext = useToast()

  async function update() {
    try {
      const data = await $fetch('/api/notification/my', {
        lazy: true,
        server: true,
        cache: 'no-cache',
        getCachedData: undefined,
      })
      if (!data) {
        return
      }

      notifications.value = data
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

  function showCompletedTaskToast(notification: NotificationWithTask) {
    toastContext.add({
      id: notification.id,
      title: notification.title,
      description: notification.description,
      avatar: {
        src: notification.task.performer.avatarUrl ?? undefined,
        alt: '',
      },
      color: 'info',
      duration: 60000,
      actions: [{
        icon: 'i-lucide-thumbs-up',
        label: 'Лайк',
        color: 'neutral',
        variant: 'outline',
        size: 'md',
        onClick: (e) => {
          e?.stopPropagation()
        },
      }, {
        icon: 'fluent-emoji-flat:party-popper',
        label: '0',
        color: 'info',
        variant: 'soft',
        size: 'md',
        ui: {
          label: 'font-semibold',
          leadingIcon: 'motion-preset-pulse motion-duration-1500',
        },
        disabled: true,
      }],
    })

    // change likes every 3 sec
    // setInterval(() => {
    //   toastContext.update(successToastId, {
    //     actions: [{
    //       icon: 'i-lucide-thumbs-up',
    //       label: 'Похвалить',
    //       color: 'neutral',
    //       variant: 'outline',
    //       size: 'md',
    //       onClick: (e) => {
    //         e?.stopPropagation()
    //       },
    //     }, {
    //       icon: 'fluent-emoji-flat:party-popper',
    //       label: toast.task.likes.toString(),
    //       color: 'info',
    //       variant: 'soft',
    //       size: 'md',
    //       ui: {
    //         label: 'font-semibold',
    //         leadingIcon: 'motion-preset-pulse motion-duration-1500',
    //       },
    //     }],
    //   })
    // }, 3000)
  }

  watch(notifications, () => {
    for (const notification of notifications.value) {
      // already shown?
      if (toastContext.toasts.value.find((toast) => toast.id === notification.id)) {
        continue
      }

      if (notification.type === 'task_completed') {
        showCompletedTaskToast(notification as NotificationWithTask)
      }
    }
  })

  onMounted(() => {
    interval.value = setInterval(() => update(), 30000)
  })

  onUnmounted(() => {
    clearInterval(interval.value)
  })

  return {
    notifications,

    update,
  }
})
