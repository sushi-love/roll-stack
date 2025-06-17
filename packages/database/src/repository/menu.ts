import type { MenuCategoryDraft, MenuDraft, ProductVariantsOnMenuCategoryDraft } from '../types'
import { and, eq } from 'drizzle-orm'
import { useDatabase } from '../database'
import { menuCategories, menus, productsInMenuCategories, productVariantsOnMenuCategories } from '../tables'

export class Menu {
  static async find(id: string) {
    const menu = await useDatabase().query.menus.findFirst({
      where: (menus, { eq }) => eq(menus.id, id),
      with: {
        categories: {
          orderBy: (category, { asc }) => asc(category.priority),
          with: {
            products: {
              orderBy: (product, { asc }) => asc(product.updatedAt),
              with: {
                product: {
                  with: {
                    media: {
                      with: {
                        items: true,
                      },
                    },
                  },
                },
                productVariants: {
                  orderBy: (variant, { asc }) => asc(variant.updatedAt),
                  with: {
                    productVariant: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    if (!menu) {
      return
    }

    return {
      ...menu,
      categories: menu.categories.map((category) => ({
        ...category,
        products: category.products.map((product) => ({
          ...product.product,
          variants: product.productVariants.map((productVariant) => productVariant.productVariant),
        })),
      })),
    }
  }

  static async checkIfUpdated(id: string) {
    const [menu] = await useDatabase().select({
      id: menus.id,
      updatedAt: menus.updatedAt,
    }).from(menus).where(eq(menus.id, id))

    return menu
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
    const menus = await useDatabase().query.menus.findMany({
      with: {
        categories: {
          orderBy: (category, { asc }) => asc(category.priority),
          with: {
            products: {
              orderBy: (product, { asc }) => asc(product.updatedAt),
              with: {
                product: {
                  with: {
                    media: {
                      with: {
                        items: true,
                      },
                    },
                  },
                },
                productVariants: {
                  orderBy: (variant, { asc }) => asc(variant.updatedAt),
                  with: {
                    productVariant: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    return menus.map((menu) => ({
      ...menu,
      categories: menu.categories.map((category) => ({
        ...category,
        products: category.products.map((product) => ({
          ...product.product,
          variants: product.productVariants.map((productVariant) => productVariant.productVariant),
        })),
      })),
    }))
  }

  static async create(data: MenuDraft) {
    const [menu] = await useDatabase().insert(menus).values(data).returning()
    return menu
  }

  static async createCategory(data: MenuCategoryDraft) {
    const [category] = await useDatabase().insert(menuCategories).values(data).returning()
    return category
  }

  static async createProductVariantOnCategory(data: ProductVariantsOnMenuCategoryDraft) {
    const [category] = await useDatabase().insert(productVariantsOnMenuCategories).values(data).returning()
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

  static async deleteCategory(id: string) {
    return useDatabase().delete(menuCategories).where(eq(menuCategories.id, id))
  }

  static async attachProduct(categoryId: string, productId: string, productVariantsId: string[]) {
    const [product] = await useDatabase().insert(productsInMenuCategories).values({
      menuCategoryId: categoryId,
      productId,
    }).returning()
    if (!product) {
      return
    }

    for (const productVariantId of productVariantsId) {
      await Menu.createProductVariantOnCategory({
        productInMenuCategoryId: product.id,
        productVariantId,
      })
    }

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
