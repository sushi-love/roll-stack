import { type } from 'arktype'

export const createMenuSchema = type({
  name: type('2 <= string <= 50').describe('error.length.invalid'),
})
export type CreateMenu = typeof createMenuSchema.infer

export const updateMenuSchema = type({
  name: type('2 <= string <= 50').describe('error.length.invalid').optional(),
  isActive: type('boolean').optional(),
})
export type UpdateMenu = typeof updateMenuSchema.infer

export const createMenuCategorySchema = type({
  name: type('2 <= string <= 50').describe('error.length.invalid'),
  menuId: type('string'),
})
export type CreateMenuCategory = typeof createMenuCategorySchema.infer

export const updateMenuCategorySchema = type({
  name: type('2 <= string <= 50').describe('error.length.invalid').optional(),
  slug: type('2 <= string <= 50').describe('error.length.invalid').optional(),
  icon: type('string').optional(),
})
export type UpdateMenuCategory = typeof updateMenuCategorySchema.infer

export const attachProductToMenuCategorySchema = type({
  categoryId: type('string'),
  productId: type('string'),
})
export type AttachProductToMenuCategory = typeof attachProductToMenuCategorySchema.infer
