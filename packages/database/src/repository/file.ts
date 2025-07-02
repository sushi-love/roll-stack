import type { FileDraft } from '../types'
import { eq } from 'drizzle-orm'
import { useDatabase } from '../database'
import { files } from '../tables'

export class File {
  static async find(id: string) {
    return useDatabase().query.files.findFirst({
      where: (files, { eq }) => eq(files.id, id),
    })
  }

  static async create(data: FileDraft) {
    const [file] = await useDatabase().insert(files).values(data).returning()
    return file
  }

  static async update(id: string, data: Partial<FileDraft>) {
    const [file] = await useDatabase()
      .update(files)
      .set(data)
      .where(eq(files.id, id))
      .returning()
    return file
  }

  static async delete(id: string) {
    return useDatabase().delete(files).where(eq(files.id, id))
  }
}
