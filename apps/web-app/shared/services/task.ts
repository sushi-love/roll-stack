import { type } from 'arktype'

export const createTaskSchema = type({
  name: type('2 <= string <= 150').describe('error.length.invalid'),
  description: type('string <= 250 | undefined').describe('error.length.invalid').optional(),
  performerId: type('string | undefined').describe('error.length.invalid').optional(),
  chatId: type('string | undefined').describe('error.length.invalid').optional(),
})
export type CreateTask = typeof createTaskSchema.infer

export const updateTaskSchema = type({
  name: type('2 <= string <= 150').describe('error.length.invalid').optional(),
  description: type('string <= 250 | undefined').describe('error.length.invalid').optional(),
  performerId: type('string | undefined | null').describe('error.length.invalid').optional(),
})
export type UpdateTask = typeof updateTaskSchema.infer
