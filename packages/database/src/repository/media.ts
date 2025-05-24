import type { MediaDraft, MediaItemDraft } from '../types'
import { eq } from 'drizzle-orm'
import { useDatabase } from '../database'
import { media, mediaItems } from '../tables'

export class Media {
  static async find(id: string) {
    return useDatabase().query.media.findFirst({
      where: (media, { eq }) => eq(media.id, id),
      with: {
        items: true,
      },
    })
  }

  static async create(data: MediaDraft) {
    const [m] = await useDatabase().insert(media).values(data).returning()
    return m
  }

  static async createItem(data: MediaItemDraft) {
    const [m] = await useDatabase().insert(mediaItems).values(data).returning()
    return m
  }

  static async update(id: string, data: Partial<MediaDraft>) {
    const [m] = await useDatabase()
      .update(media)
      .set(data)
      .where(eq(media.id, id))
      .returning()
    return m
  }

  static async delete(id: string) {
    return useDatabase().delete(media).where(eq(media.id, id))
  }
}
