import { type } from 'arktype'
import { weightUnitSchema } from './common'

export const createProductSchema = type({
  name: type('2 <= string <= 75').describe('error.length.invalid'),
  description: type('string <= 1000 | undefined').describe('error.length.invalid').optional(),
})
export type CreateProduct = typeof createProductSchema.infer

export const updateProductSchema = type({
  name: type('2 <= string <= 75').describe('error.length.invalid').optional(),
  description: type('0 <= string <= 1000').describe('error.length.invalid').optional(),
  slug: type('2 <= string <= 50').describe('error.length.invalid').optional(),
  isAvailableForPurchase: type('boolean').optional(),
})
export type UpdateProduct = typeof updateProductSchema.infer

export const createProductVariantSchema = type({
  productId: type('string'),
  name: type('2 <= string <= 50').describe('error.length.invalid'),
  weightValue: type('number >= 0'),
  weightUnit: weightUnitSchema,
  gross: type('number >= 0'),
  net: type('number | undefined').optional(),
  calories: type('number | undefined').optional(),
  protein: type('number | undefined').optional(),
  fat: type('number | undefined').optional(),
  carbohydrate: type('number | undefined').optional(),
  sku: type('string | undefined').optional(),
})
export type CreateProductVariant = typeof createProductVariantSchema.infer

export const updateProductVariantSchema = type({
  name: type('2 <= string <= 50').describe('error.length.invalid').optional(),
  weightValue: type('number >= 0').optional(),
  weightUnit: weightUnitSchema.optional(),
  gross: type('number >= 0').optional(),
  net: type('number | undefined').optional(),
  calories: type('number | undefined | null').optional(),
  protein: type('number | undefined | null').optional(),
  fat: type('number | undefined | null').optional(),
  carbohydrate: type('number | undefined | null').optional(),
  sku: type('string | undefined').optional(),
})
export type UpdateProductVariant = typeof updateProductVariantSchema.infer
