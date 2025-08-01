import { type } from 'arktype'

export const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20MB
export const ACCEPTED_FILE_TYPES = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
]

const FileSchema = type('File')
  .narrow((file) => file.size <= MAX_FILE_SIZE && ACCEPTED_FILE_TYPES.includes(file.type))
  .describe('error.file-size-or-type')

export const uploadFileSchema = type({
  files: FileSchema.array(),
})
export type UploadFile = typeof uploadFileSchema.infer
