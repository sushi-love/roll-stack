import type { ProductDraft, ProductVariantDraft } from '../types'
import { eq } from 'drizzle-orm'
import { useDatabase } from '../database'
import { products, productTagsOnProducts, productVariants } from '../tables'

export class Product {
  static async find(id: string) {
    return useDatabase().query.products.findFirst({
      where: (products, { eq }) => eq(products.id, id),
      with: {
        categories: true,
        variants: true,
        tags: {
          with: {
            productTag: true,
          },
        },
        media: {
          with: {
            items: true,
          },
        },
      },
    })
  }

  static async findVariant(id: string) {
    return useDatabase().query.productVariants.findFirst({
      where: (productVariants, { eq }) => eq(productVariants.id, id),
    })
  }

  static async list() {
    return useDatabase().query.products.findMany({
      orderBy: (products, { asc }) => asc(products.name),
      with: {
        categories: true,
        variants: true,
        tags: {
          with: {
            productTag: true,
          },
        },
        media: {
          with: {
            items: true,
          },
        },
      },
    })
  }

  static async listTags() {
    return useDatabase().query.productTags.findMany({
      orderBy: (productTags, { asc }) => asc(productTags.name),
    })
  }

  static async create(data: ProductDraft) {
    const [product] = await useDatabase().insert(products).values(data).returning()
    return product
  }

  static async createVariant(data: ProductVariantDraft) {
    const [variant] = await useDatabase().insert(productVariants).values(data).returning()
    return variant
  }

  static async createTagOnProduct(productId: string, productTagId: string) {
    const [tag] = await useDatabase().insert(productTagsOnProducts).values({
      productId,
      productTagId,
    }).returning()
    return tag
  }

  static async update(id: string, data: Partial<ProductDraft>) {
    const [product] = await useDatabase()
      .update(products)
      .set(data)
      .where(eq(products.id, id))
      .returning()
    return product
  }

  static async updateVariant(id: string, data: Partial<ProductVariantDraft>) {
    const [variant] = await useDatabase()
      .update(productVariants)
      .set(data)
      .where(eq(productVariants.id, id))
      .returning()
    return variant
  }

  static async updateTags(productId: string, tagsId: string[]) {
    const currentTags = await useDatabase().query.productTagsOnProducts.findMany({
      where: (tag, { eq }) => eq(tag.productId, productId),
    })

    // If some tags are removed
    for (const tag of currentTags) {
      if (!tagsId.includes(tag.productTagId)) {
        await Product.deleteTagOnProduct(tag.id)
      }
    }

    // If some tags are added
    for (const tagId of tagsId) {
      if (!currentTags.find((tag) => tag.productTagId === tagId)) {
        await Product.createTagOnProduct(productId, tagId)
      }
    }
  }

  static async delete(id: string) {
    return useDatabase().delete(products).where(eq(products.id, id))
  }

  static async deleteVariant(id: string) {
    return useDatabase().delete(productVariants).where(eq(productVariants.id, id))
  }

  static async deleteTagOnProduct(id: string) {
    return useDatabase().delete(productTagsOnProducts).where(eq(productTagsOnProducts.id, id))
  }
}
