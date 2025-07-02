import type { Post, PostLike, User } from '@sushi-atrium/database'
import type { MediaWithItems } from '~~/types'

type PostLikeWithUser = PostLike & {
  user: User
}

type PostWithData = Post & {
  likes: PostLikeWithUser[]
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

  async function addLike(postId: string) {
    try {
      await $fetch(`/api/post/id/${postId}/like`, {
        method: 'POST',
      })

      await update()
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

  async function removeLike(postId: string) {
    try {
      await $fetch(`/api/post/id/${postId}/like`, {
        method: 'DELETE',
      })

      await update()
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
    addLike,
    removeLike,
  }
})
