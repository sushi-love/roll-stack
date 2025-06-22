import type { PostDraft } from '../types'
import { eq } from 'drizzle-orm'
import { useDatabase } from '../database'
import { posts } from '../tables'

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

  static async list() {
    return useDatabase().query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.publishAt),
      with: {
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

  static async update(id: string, data: Partial<PostDraft>) {
    const [post] = await useDatabase()
      .update(posts)
      .set(data)
      .where(eq(posts.id, id))
      .returning()
    return post
  }

  static async delete(id: string) {
    return useDatabase().delete(posts).where(eq(posts.id, id))
  }
}
