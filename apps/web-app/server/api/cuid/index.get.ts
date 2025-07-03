import { createId } from '@paralleldrive/cuid2'

export default defineEventHandler(async () => {
  return createId()
})
