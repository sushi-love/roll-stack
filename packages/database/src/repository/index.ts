import { useDatabase } from '../database'
import { Chat } from './chat'
import { User } from './user'

class Repository {
  readonly chat = Chat
  readonly user = User

  async checkHealth(): Promise<boolean> {
    await useDatabase().query.users.findFirst()
    return true
  }
}

export const repository = new Repository()
