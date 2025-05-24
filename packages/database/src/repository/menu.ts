import type { MenuCategoryDraft, MenuDraft } from '../types'
import { and, eq } from 'drizzle-orm'
import { useDatabase } from '../database'
import { menuCategories, menus, productsInMenuCategories } from '../tables'

export class Menu {
  static async find(id: string) {
    return useDatabase().query.menus.findFirst({
      where: (menus, { eq }) => eq(menus.id, id),
      with: {
        categories: true,
      },
    })
  }

  static async findCategory(id: string) {
    return useDatabase().query.menuCategories.findFirst({
      where: (menuCategories, { eq }) => eq(menuCategories.id, id),
      with: {
        products: true,
      },
    })
  }

  static async list() {
    return useDatabase().query.menus.findMany({
      with: {
        categories: true,
      },
    })
  }

  static async create(data: MenuDraft) {
    const [menu] = await useDatabase().insert(menus).values(data).returning()
    return menu
  }

  static async createCategory(data: MenuCategoryDraft) {
    const [category] = await useDatabase().insert(menuCategories).values(data).returning()
    return category
  }

  static async update(id: string, data: Partial<MenuDraft>) {
    const [menu] = await useDatabase()
      .update(menus)
      .set(data)
      .where(eq(menus.id, id))
      .returning()
    return menu
  }

  static async updateCategory(id: string, data: Partial<MenuCategoryDraft>) {
    const [category] = await useDatabase()
      .update(menuCategories)
      .set(data)
      .where(eq(menuCategories.id, id))
      .returning()
    return category
  }

  static async delete(id: string) {
    return useDatabase().delete(menus).where(eq(menus.id, id))
  }

  static async attachProduct(categoryId: string, productId: string) {
    const [product] = await useDatabase().insert(productsInMenuCategories).values({
      menuCategoryId: categoryId,
      productId,
    }).returning()

    return product
  }

  static async detachProduct(categoryId: string, productId: string) {
    return useDatabase().delete(productsInMenuCategories).where(
      and(
        eq(productsInMenuCategories.menuCategoryId, categoryId),
        eq(productsInMenuCategories.productId, productId),
      ),
    )
  }
}
