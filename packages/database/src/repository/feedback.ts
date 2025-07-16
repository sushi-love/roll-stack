import type { FeedbackPointDraft } from '../types'
import { eq, sql } from 'drizzle-orm'
import { useDatabase } from '../database'
import { feedbackPoints } from '../tables'

export class Feedback {
  static async findFeedbackPoint(id: string) {
    return useDatabase().query.feedbackPoints.findFirst({
      where: (point, { eq }) => eq(point.id, id),
    })
  }

  static async listFeedbackPointsToUpdate() {
    return useDatabase().query.feedbackPoints.findMany({
      where: (point, { lte }) => lte(point.updatedAt, sql`now() - interval '1 day'`),
      orderBy: (point, { asc }) => asc(point.updatedAt),
    })
  }

  static async createFeedbackPoint(data: FeedbackPointDraft) {
    const [point] = await useDatabase().insert(feedbackPoints).values(data).returning()
    return point
  }

  static async updateFeedbackPoint(id: string, data: Partial<FeedbackPointDraft>) {
    return useDatabase()
      .update(feedbackPoints)
      .set({
        ...data,
        updatedAt: sql`now()`,
      })
      .where(eq(feedbackPoints.id, id))
      .returning()
  }
}
