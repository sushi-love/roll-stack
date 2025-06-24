import type { PaymentMethodDraft } from '../types'
import { eq } from 'drizzle-orm'
import { useDatabase } from '../database'
import { paymentMethods } from '../tables'

export class Payment {
  static async findMethod(id: string) {
    return useDatabase().query.paymentMethods.findFirst({
      where: (methods, { eq }) => eq(methods.id, id),
    })
  }

  static async listMethods() {
    return useDatabase().query.paymentMethods.findMany()
  }

  static async createMethod(data: PaymentMethodDraft) {
    const [method] = await useDatabase().insert(paymentMethods).values(data).returning()
    return method
  }

  static async updateMethod(id: string, data: Partial<PaymentMethodDraft>) {
    const [method] = await useDatabase()
      .update(paymentMethods)
      .set(data)
      .where(eq(paymentMethods.id, id))
      .returning()
    return method
  }

  static async deleteMethod(id: string) {
    return useDatabase().delete(paymentMethods).where(eq(paymentMethods.id, id))
  }
}
