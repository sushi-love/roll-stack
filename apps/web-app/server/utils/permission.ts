import type { H3Event } from 'h3'
import { repository } from '@roll-stack/database'

export async function hasPermission(event: H3Event, permission: PermissionCode) {
  const session = await getUserSession(event)
  if (!session?.user) {
    throw createError({
      statusCode: 401,
      message: 'Not logged in',
    })
  }

  const user = await repository.user.find(session.user.id)
  if (!user) {
    throw createError({
      statusCode: 404,
      message: 'User not found',
    })
  }

  if (!user.permissions.length || !user.permissions.includes(permission)) {
    throw createError({
      statusCode: 403,
      message: 'Forbidden',
    })
  }
}
