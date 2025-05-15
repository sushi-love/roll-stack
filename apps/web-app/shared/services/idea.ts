import { type } from 'arktype'

export const createIdeaSchema = type({
  text: '10 < string < 1500',
})
export type CreateIdea = typeof createIdeaSchema.infer
