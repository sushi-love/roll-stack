import { type } from 'arktype'

export const createIdeaSchema = type({
  text: type('10 <= string <= 1500').describe('error.length.invalid'),
})
export type CreateIdea = typeof createIdeaSchema.infer
