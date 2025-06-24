import type { CheckoutDraft, CheckoutItemDraft } from '../types'
import { eq, sql } from 'drizzle-orm'
import { useDatabase } from '../database'
import { checkoutItems, checkouts } from '../tables'

export class Checkout {
  static async find(id: string) {
    return useDatabase().query.checkouts.findFirst({
      where: (checkout, { eq }) => eq(checkout.id, id),
      with: {
        items: {
          orderBy: (items, { asc }) => asc(items.createdAt),
          with: {
            productVariant: {
              with: {
                product: true,
              },
            },
          },
        },
      },
    })
  }

  static async listLatest() {
    return useDatabase().query.checkouts.findMany({
      orderBy: (checkout, { desc }) => desc(checkout.updatedAt),
      with: {
        items: {
          orderBy: (items, { asc }) => asc(items.createdAt),
          with: {
            productVariant: {
              with: {
                product: true,
              },
            },
          },
        },
      },
    })
  }

  static async recalculate(id: string) {
    const checkout = await Checkout.find(id)
    if (!checkout) {
      return
    }

    for (const item of checkout.items) {
      // Check if item has no quantity
      if (item.quantity <= 0) {
        await Checkout.deleteItem(item.id)
        continue
      }

      item.totalPrice = item.quantity * item.productVariant.gross
      item.unitPrice = item.productVariant.gross

      // Update prices
      await Checkout.updateItem(item.id, {
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
      })
    }

    const deliveryPrice = checkout.deliveryMethod === 'delivery' ? 150 : 0

    const itemsPrice = checkout.items.reduce((acc, item) => {
      return acc + item.totalPrice
    }, 0)

    const totalPrice = deliveryPrice + itemsPrice

    await Checkout.update(id, {
      itemsPrice,
      deliveryPrice,
      totalPrice,
    })
  }

  static async create(data: CheckoutDraft) {
    const [checkout] = await useDatabase().insert(checkouts).values(data).returning()
    return checkout
  }

  static async createItem(data: CheckoutItemDraft) {
    const [item] = await useDatabase().insert(checkoutItems).values(data).returning()
    return item
  }

  static async update(id: string, data: Partial<CheckoutDraft>) {
    const [checkout] = await useDatabase()
      .update(checkouts)
      .set({
        ...data,
        updatedAt: sql`now()`,
      })
      .where(eq(checkouts.id, id))
      .returning()
    return checkout
  }

  static async updateItem(id: string, data: Partial<CheckoutItemDraft>) {
    const [item] = await useDatabase()
      .update(checkoutItems)
      .set(data)
      .where(eq(checkoutItems.id, id))
      .returning()
    return item
  }

  static async delete(id: string) {
    await useDatabase().delete(checkouts).where(eq(checkouts.id, id))
  }

  static async deleteItem(id: string) {
    await useDatabase().delete(checkoutItems).where(eq(checkoutItems.id, id))
  }
}
