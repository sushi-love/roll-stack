import { useDatabase } from '../database'
import { Chat } from './chat'
import { Checkout } from './checkout'
import { City } from './city'
import { Kitchen } from './kitchen'
import { Media } from './media'
import { Menu } from './menu'
import { Notification } from './notification'
import { Permission } from './permission'
import { Post } from './post'
import { Product } from './product'
import { Task } from './task'
import { User } from './user'

class Repository {
  readonly chat = Chat
  readonly checkout = Checkout
  readonly city = City
  readonly kitchen = Kitchen
  readonly media = Media
  readonly menu = Menu
  readonly notification = Notification
  readonly permission = Permission
  readonly post = Post
  readonly product = Product
  readonly task = Task
  readonly user = User

  async checkHealth(): Promise<boolean> {
    await useDatabase().query.users.findFirst()
    return true
  }
}

export const repository = new Repository()
