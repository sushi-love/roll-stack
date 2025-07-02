import type { ObjectDraft } from '../types'
import { eq } from 'drizzle-orm'
import { useDatabase } from '../database'
import { objects } from '../tables'

export class Object {
  static async find(id: string) {
    return useDatabase().query.objects.findFirst({
      where: (objects, { eq }) => eq(objects.id, id),
    })
  }

  static async list() {
    return useDatabase().query.objects.findMany({
      where: (objects, { isNull }) => isNull(objects.parentId),
    })
  }

  static async search(value: string, parentId: string) {
    return useDatabase().query.objects.findMany({
      where: (objects, { like, and }) => and(
        like(objects.name, `%${value}%`),
        eq(objects.parentId, parentId),
        eq(objects.isActive, true),
      ),
    })
  }

  static async create(data: ObjectDraft) {
    const [object] = await useDatabase().insert(objects).values(data).returning()
    return object
  }

  static async update(id: string, data: Partial<ObjectDraft>) {
    const [object] = await useDatabase()
      .update(objects)
      .set(data)
      .where(eq(objects.id, id))
      .returning()
    return object
  }

  static async delete(id: string) {
    return useDatabase().delete(objects).where(eq(objects.id, id))
  }
}
