import type { Media, MediaItem, Product, ProductsInMenuCategory, ProductVariant } from '@sushi-atrium/database'

export type ProductWithData = Product & {
  categories: ProductsInMenuCategory[]
  variants: ProductVariant[]
  media: MediaWithItems | null
}

export type MediaWithItems = Media & {
  items: MediaItem[]
}
