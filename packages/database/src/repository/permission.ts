import type { PermissionDraft } from '../types'
import { eq } from 'drizzle-orm'
import { useDatabase } from '../database'
import { permissions } from '../tables'

export class Permission {
  static async find(id: string) {
    return useDatabase().query.permissions.findFirst({
      where: (permissions, { eq }) => eq(permissions.id, id),
    })
  }

  static async list() {
    return useDatabase().query.permissions.findMany()
  }

  static async create(data: PermissionDraft) {
    const [permission] = await useDatabase().insert(permissions).values(data).returning()
    return permission
  }

  static async update(id: string, data: Partial<PermissionDraft>) {
    const [permission] = await useDatabase()
      .update(permissions)
      .set(data)
      .where(eq(permissions.id, id))
      .returning()
    return permission
  }

  static async delete(id: string) {
    return useDatabase().delete(permissions).where(eq(permissions.id, id))
  }
}
