import type { Post } from '@sushi-atrium/database'
import type { MediaWithItems } from '~~/types'

type PostWithData = Post & {
  media: MediaWithItems | null
}

export const usePostStore = defineStore('post', () => {
  const posts = ref<PostWithData[]>([])

  async function update() {
    try {
      const data = await $fetch('/api/post/list', {
        lazy: true,
        server: true,
        cache: 'no-cache',
        getCachedData: undefined,
      })
      if (!data) {
        return
      }

      posts.value = data
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          // No
        }
        if (error.message.includes('404')) {
          // Not found
        }
      }
    }
  }

  return {
    posts,

    update,
  }
})
