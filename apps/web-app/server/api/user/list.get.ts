import type { User } from '~~/types'

export default defineEventHandler(async () => {
  try {
    const users = generateUsers()

    return users
  } catch (error) {
    throw errorResolver(error)
  }
})

function generateUsers(): User[] {
  const users = []
  for (let i = 0; i < 50; i++) {
    users.push({
      id: i.toString(),
      name: `Имя ${i}`,
      surname: `Фамилия ${i}`,
      email: `email${i}@email.ru`,
      avatar: `http://localhost:3501/api/avatar/${i}.svg`,
    })
  }

  return users
}
