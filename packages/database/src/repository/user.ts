import type { UserDraft } from '../types'
import { eq } from 'drizzle-orm'
import { useDatabase } from '../database'
import { users } from '../tables'

export class User {
  static async find(id: string) {
    return useDatabase().query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
    })
  }

  static async findByEmail(email: string) {
    return useDatabase().query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    })
  }

  static async findByPhone(phone: string) {
    return useDatabase().query.users.findFirst({
      where: (users, { eq }) => eq(users.phone, phone),
    })
  }

  static async findStaff() {
    return useDatabase().query.users.findMany({
      where: (users, { eq }) => eq(users.type, 'staff'),
      with: {
        focusedTask: true,
      },
    })
  }

  static async findPartners() {
    return useDatabase().query.users.findMany({
      where: (users, { eq }) => eq(users.type, 'partner'),
    })
  }

  static async create(data: UserDraft) {
    const [user] = await useDatabase().insert(users).values(data).returning()
    return user
  }

  static async update(id: string, data: Partial<UserDraft>) {
    const [user] = await useDatabase()
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning()
    return user
  }

  static async delete(id: string) {
    return useDatabase().delete(users).where(eq(users.id, id))
  }
}
