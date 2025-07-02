import { type } from 'arktype'

export const createPrintSchema = type({
  name: type('2 <= string <= 75').describe('error.length.invalid'),
  description: type('string <= 1000 | undefined').describe('error.length.invalid').optional(),
  importantInfo: type('string <= 500 | undefined').describe('error.length.invalid').optional(),
  technicalInfo: type('string <= 500 | undefined').describe('error.length.invalid').optional(),
  regularAmount: type('number | undefined').describe('error.length.invalid').optional(),
})
export type CreatePrint = typeof createPrintSchema.infer

export const updatePrintSchema = type({
  name: type('2 <= string <= 75').describe('error.length.invalid').optional(),
  description: type('string <= 1000 | undefined').describe('error.length.invalid').optional(),
  importantInfo: type('string <= 500 | undefined').describe('error.length.invalid').optional(),
  technicalInfo: type('string <= 500 | undefined').describe('error.length.invalid').optional(),
  regularAmount: type('number | undefined').describe('error.length.invalid').optional(),
})
export type UpdatePrint = typeof updatePrintSchema.infer
