import { useDatabase } from '../database'
import { Chat } from './chat'
import { Media } from './media'
import { Menu } from './menu'
import { Product } from './product'
import { User } from './user'

class Repository {
  readonly chat = Chat
  readonly media = Media
  readonly menu = Menu
  readonly product = Product
  readonly user = User

  async checkHealth(): Promise<boolean> {
    await useDatabase().query.users.findFirst()
    return true
  }
}

export const repository = new Repository()
