import { type } from 'arktype'

const postTypeSchema = type('"vk" | "telegram"')
const postStatusSchema = type('"draft" | "published" | "scheduled"')

export const createPostSchema = type({
  type: postTypeSchema.describe('error.length.invalid'),
  description: type('string <= 1000 | undefined').describe('error.length.invalid').optional(),
  content: type('1 <= string <= 2000').describe('error.length.invalid'),
  publishAt: type('string').describe('error.length.invalid'),
  status: postStatusSchema.describe('error.length.invalid'),
})
export type CreatePost = typeof createPostSchema.infer

export const updatePostSchema = type({
  type: postTypeSchema.describe('error.length.invalid').optional(),
  description: type('string <= 1000 | undefined').describe('error.length.invalid').optional(),
  content: type('1 <= string <= 2000 | undefined').describe('error.length.invalid').optional(),
  publishAt: type('string | undefined').describe('error.length.invalid').optional(),
  status: postStatusSchema.describe('error.length.invalid').optional(),
  url: type('string | undefined').describe('error.length.invalid').optional(),
})
export type UpdatePost = typeof updatePostSchema.infer
