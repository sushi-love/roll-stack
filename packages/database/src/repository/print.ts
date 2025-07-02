import type { PrintDraft } from '../types'
import { eq } from 'drizzle-orm'
import { useDatabase } from '../database'
import { prints } from '../tables'

export class Print {
  static async find(id: string) {
    return useDatabase().query.prints.findFirst({
      where: (prints, { eq }) => eq(prints.id, id),
      with: {
        mainFile: true,
        previewFile: true,
      },
    })
  }

  static async list() {
    return useDatabase().query.prints.findMany({
      orderBy: (prints, { desc }) => desc(prints.updatedAt),
      with: {
        mainFile: true,
        previewFile: true,
      },
    })
  }

  static async create(data: PrintDraft) {
    const [print] = await useDatabase().insert(prints).values(data).returning()
    return print
  }

  static async update(id: string, data: Partial<PrintDraft>) {
    const [print] = await useDatabase()
      .update(prints)
      .set(data)
      .where(eq(prints.id, id))
      .returning()
    return print
  }

  static async delete(id: string) {
    return useDatabase().delete(prints).where(eq(prints.id, id))
  }
}
