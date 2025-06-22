import type { Media, MediaItem, Menu, MenuCategory, Product, ProductsInMenuCategory, ProductTag, ProductVariant, ProductVariantTag } from '@sushi-atrium/database'

export type ProductVariantWithData = ProductVariant & {
  tags: ProductVariantTag[]
}

export type ProductWithData = Product & {
  categories: ProductsInMenuCategory[]
  variants: ProductVariantWithData[]
  tags: ProductTag[]
  media: MediaWithItems | null
}

export type MenuWithData = Menu & {
  categories: (MenuCategory & {
    products: (Product & {
      variants: ProductVariant[]
      media: MediaWithItems | null
    })[]
  })[]
}

export type MediaWithItems = Media & {
  items: MediaItem[]
}

export type PermissionCode = 'product:view'
  | 'product:edit'
  | 'product:delete'
  | 'product:image:edit'
  | 'post:view'
  | 'post:edit'
  | 'post:delete'
  | 'post:image:edit'
