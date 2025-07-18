import type { PostCommentDraft, PostDraft } from '../types'
import { eq, sql } from 'drizzle-orm'
import { useDatabase } from '../database'
import { postComments, postLikes, posts } from '../tables'

export class Post {
  static async find(id: string) {
    return useDatabase().query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
      with: {
        media: {
          with: {
            items: true,
          },
        },
      },
    })
  }

  static async findLike(postId: string, userId: string) {
    return useDatabase().query.postLikes.findFirst({
      where: (postLikes, { eq, and }) => and(
        eq(postLikes.postId, postId),
        eq(postLikes.userId, userId),
      ),
    })
  }

  static async findComment(id: string) {
    return useDatabase().query.postComments.findFirst({
      where: (postComments, { eq }) => eq(postComments.id, id),
    })
  }

  static async list() {
    return useDatabase().query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.publishAt),
      with: {
        comments: {
          with: {
            user: true,
          },
        },
        likes: {
          with: {
            user: true,
          },
        },
        media: {
          with: {
            items: true,
          },
        },
      },
    })
  }

  static async create(data: PostDraft) {
    const [post] = await useDatabase().insert(posts).values(data).returning()
    return post
  }

  static async createLike(postId: string, userId: string) {
    const [like] = await useDatabase().insert(postLikes).values({ postId, userId }).returning()
    return like
  }

  static async createComment(data: PostCommentDraft) {
    const [comment] = await useDatabase().insert(postComments).values(data).returning()
    return comment
  }

  static async update(id: string, data: Partial<PostDraft>) {
    const [post] = await useDatabase()
      .update(posts)
      .set({
        ...data,
        updatedAt: sql`now()`,
      })
      .where(eq(posts.id, id))
      .returning()
    return post
  }

  static async delete(id: string) {
    return useDatabase().delete(posts).where(eq(posts.id, id))
  }

  static async deleteLike(id: string) {
    return useDatabase().delete(postLikes).where(eq(postLikes.id, id))
  }

  static async deleteComment(id: string) {
    return useDatabase().delete(postComments).where(eq(postComments.id, id))
  }
}
