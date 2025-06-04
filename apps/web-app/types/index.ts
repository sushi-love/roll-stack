import type { Media, MediaItem, Product, ProductsInMenuCategory, ProductTag, ProductVariant, ProductVariantTag } from '@sushi-atrium/database'

export type ProductVariantWithData = ProductVariant & {
  tags: ProductVariantTag[]
}

export type ProductWithData = Product & {
  categories: ProductsInMenuCategory[]
  variants: ProductVariantWithData[]
  tags: ProductTag[]
  media: MediaWithItems | null
}

export type MediaWithItems = Media & {
  items: MediaItem[]
}
