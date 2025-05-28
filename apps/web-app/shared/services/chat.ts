import { type } from 'arktype'

export const createChatMessageSchema = type({
  text: type('1 <= string <= 1500').describe('error.length.invalid'),
})
export type CreateChatMessage = typeof createChatMessageSchema.infer

export const createChatSchema = type({
  name: type('2 <= string <= 50').describe('error.length.invalid'),
  description: type('string <= 100 | undefined').describe('error.length.invalid').optional(),
  usersId: type('string[]').describe('error.length.invalid'),
})
export type CreateChat = typeof createChatSchema.infer

export const updateChatSchema = type({
  name: type('2 <= string <= 50').describe('error.length.invalid').optional(),
  description: type('string <= 100 | undefined').describe('error.length.invalid').optional(),
})
export type UpdateChat = typeof updateChatSchema.infer
