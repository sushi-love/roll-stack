import { repository } from '@sushi-atrium/database'
import { type } from 'arktype'
import { createTaskSchema } from '~~/shared/services/task'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const data = createTaskSchema(body)
    if (data instanceof type.errors) {
      throw data
    }

    const task = await repository.task.create({
      name: data.name,
      description: data.description,
      performerId: data.performerId,
      chatId: data.chatId,
    })

    return {
      ok: true,
      result: task,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
