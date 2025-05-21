import { type } from 'arktype'

export const createChatMessageSchema = type({
  text: type('1 < string < 1500').describe('error.length.invalid'),
})
export type CreateChatMessage = typeof createChatMessageSchema.infer
