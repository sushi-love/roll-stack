import type { Post, PostComment, PostLike, User } from '@roll-stack/database'
import type { MediaWithItems } from '~~/types'

type PostLikeWithUser = PostLike & {
  user: User
}

type PostCommentWithUser = PostComment & {
  user: User
}

type PostWithData = Post & {
  likes: PostLikeWithUser[]
  comments: PostCommentWithUser[]
  media: MediaWithItems | null
}

export const usePostStore = defineStore('post', () => {
  const posts = ref<PostWithData[]>([])

  async function update() {
    try {
      const data = await $fetch('/api/post/list')
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

  async function addComment(postId: string, text: string) {
    try {
      await $fetch(`/api/post/id/${postId}/comment`, {
        method: 'POST',
        body: {
          text,
        },
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

  async function removeComment(id: string) {
    try {
      await $fetch(`/api/post/comment/id/${id}`, {
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
    addComment,
    removeComment,
  }
})
