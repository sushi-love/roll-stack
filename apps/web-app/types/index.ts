import type { Media, MediaItem, Product, ProductsInMenuCategory, ProductTag, ProductTagOnProduct, ProductVariant } from '@sushi-atrium/database'

export type ProductWithData = Product & {
  categories: ProductsInMenuCategory[]
  variants: ProductVariant[]
  tags: (ProductTagOnProduct & { productTag: ProductTag })[]
  media: MediaWithItems | null
}

export type MediaWithItems = Media & {
  items: MediaItem[]
}
