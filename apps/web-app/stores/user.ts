import type { User } from '~~/types'

export const useUserStore = defineStore('user', () => {
  const id = ref<string | undefined>(undefined)
  const name = ref<string | undefined>(undefined)
  const surname = ref<string | undefined>(undefined)
  const email = ref<string | undefined>(undefined)
  const avatar = ref<string | null>(null)
  const users = ref<User[]>([])

  const fullName = computed(() => {
    return `${name.value} ${surname.value}`
  })

  async function update() {
    try {
      const data = await $fetch('/api/user', {
        lazy: true,
        server: true,
        cache: 'no-cache',
        getCachedData: undefined,
      })
      if (!data) {
        return
      }

      id.value = data.id
      name.value = data.name
      surname.value = data.surname
      email.value = data.email
      avatar.value = data.avatar
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('404')) {
          // Not found
        }
      }
    }
  }

  async function updateUsers() {
    try {
      const data = await $fetch('/api/user/list', {
        lazy: true,
        server: true,
        cache: 'no-cache',
        getCachedData: undefined,
      })
      if (!data) {
        return
      }

      users.value = data
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('404')) {
          // Not found
        }
      }
    }
  }

  return {
    id,
    name,
    surname,
    email,
    avatar,
    users,

    fullName,

    update,
    updateUsers,
  }
})
