import type { TaskDraft } from '../types'
import { eq, sql } from 'drizzle-orm'
import { useDatabase } from '../database'
import { tasks } from '../tables'

export class Task {
  static async find(id: string) {
    return useDatabase().query.tasks.findFirst({
      where: (tasks, { eq }) => eq(tasks.id, id),
    })
  }

  static async list() {
    return useDatabase().query.tasks.findMany()
  }

  static async listByUser(userId: string) {
    return useDatabase().query.tasks.findMany({
      where: (tasks, { eq }) => eq(tasks.performerId, userId),
    })
  }

  static async create(data: TaskDraft) {
    const [task] = await useDatabase().insert(tasks).values(data).returning()
    return task
  }

  static async update(id: string, data: Partial<TaskDraft>) {
    const [task] = await useDatabase()
      .update(tasks)
      .set(data)
      .where(eq(tasks.id, id))
      .returning()
    return task
  }

  static async complete(id: string, data: Pick<TaskDraft, 'resolution' | 'report'>) {
    const [task] = await useDatabase()
      .update(tasks)
      .set({
        completedAt: sql`now()`,
        ...data,
      })
      .where(eq(tasks.id, id))
      .returning()
    return task
  }

  static async delete(id: string) {
    return useDatabase().delete(tasks).where(eq(tasks.id, id))
  }
}
