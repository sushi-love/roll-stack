import { useDatabase } from '../database'

export class Feedback {
  static async findFeedbackPoint(id: string) {
    return useDatabase().query.feedbackPoints.findFirst({
      where: (point, { eq }) => eq(point.id, id),
    })
  }
}
