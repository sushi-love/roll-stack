import type { ProductDraft, ProductVariantDraft } from '../types'
import { eq } from 'drizzle-orm'
import { useDatabase } from '../database'
import { products, productTagsOnProducts, productVariants, productVariantTagsOnProductVariants } from '../tables'

export class Product {
  static async find(id: string) {
    const product = await useDatabase().query.products.findFirst({
      where: (products, { eq }) => eq(products.id, id),
      with: {
        categories: true,
        variants: {
          with: {
            tags: {
              with: {
                productVariantTag: true,
              },
            },
          },
        },
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

    return {
      ...product,
      variants: product?.variants.map((variant) => ({
        ...variant,
        tags: variant?.tags.map((tag) => tag.productVariantTag),
      })),
      tags: product?.tags.map((tag) => tag.productTag),
    }
  }

  static async findVariant(id: string) {
    const variant = await useDatabase().query.productVariants.findFirst({
      where: (productVariants, { eq }) => eq(productVariants.id, id),
      with: {
        tags: {
          with: {
            productVariantTag: true,
          },
        },
      },
    })

    return {
      ...variant,
      tags: variant?.tags.map((tag) => tag.productVariantTag),
    }
  }

  static async list() {
    const products = await useDatabase().query.products.findMany({
      orderBy: (products, { asc }) => asc(products.name),
      with: {
        categories: true,
        variants: {
          with: {
            tags: {
              with: {
                productVariantTag: true,
              },
            },
          },
        },
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

    return products.map((product) => ({
      ...product,
      variants: product.variants.map((variant) => ({
        ...variant,
        tags: variant?.tags.map((tag) => tag.productVariantTag),
      })),
      tags: product.tags.map((tag) => tag.productTag),
    }))
  }

  static async listTags() {
    return useDatabase().query.productTags.findMany({
      orderBy: (productTags, { asc }) => asc(productTags.name),
    })
  }

  static async listVariantTags() {
    return useDatabase().query.productVariantTags.findMany({
      orderBy: (productVariantTags, { asc }) => asc(productVariantTags.name),
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

  static async createTagOnProductVariant(productVariantId: string, productVariantTagId: string) {
    const [tag] = await useDatabase().insert(productVariantTagsOnProductVariants).values({
      productVariantId,
      productVariantTagId,
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

  static async updateTagsOnVariant(variantId: string, tagsId: string[]) {
    const currentTags = await useDatabase().query.productVariantTagsOnProductVariants.findMany({
      where: (tag, { eq }) => eq(tag.productVariantId, variantId),
    })

    // If some tags are removed
    for (const tag of currentTags) {
      if (!tagsId.includes(tag.productVariantTagId)) {
        await Product.deleteTagOnProductVariant(tag.id)
      }
    }

    // If some tags are added
    for (const tagId of tagsId) {
      if (!currentTags.find((tag) => tag.productVariantTagId === tagId)) {
        await Product.createTagOnProductVariant(variantId, tagId)
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

  static async deleteTagOnProductVariant(id: string) {
    return useDatabase().delete(productVariantTagsOnProductVariants).where(eq(productVariantTagsOnProductVariants.id, id))
  }
}
