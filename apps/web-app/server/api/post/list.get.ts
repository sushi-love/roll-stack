import { repository } from '@sushi-atrium/database'

export default defineEventHandler(async () => {
  return repository.post.list()
})
