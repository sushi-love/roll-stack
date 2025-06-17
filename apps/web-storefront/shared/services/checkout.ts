import { type } from 'arktype'

export const createCheckoutSchema = type({
  name: type('1 <= string <= 75').describe('error.length.invalid'),
})
export type CreateCheckout = typeof createCheckoutSchema.infer

export const updateCheckoutSchema = type({
  name: type('1 <= string <= 75').describe('error.length.invalid').optional(),
  phone: type('string | undefined').describe('error.length.invalid').optional(),
})
export type UpdateCheckout = typeof updateCheckoutSchema.infer
