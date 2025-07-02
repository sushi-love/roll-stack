import { useDatabase } from '../database'
import { Channel } from './channel'
import { Chat } from './chat'
import { Checkout } from './checkout'
import { City } from './city'
import { File } from './file'
import { Kitchen } from './kitchen'
import { Media } from './media'
import { Menu } from './menu'
import { Notification } from './notification'
import { Payment } from './payment'
import { Permission } from './permission'
import { Post } from './post'
import { Print } from './print'
import { Product } from './product'
import { Task } from './task'
import { User } from './user'

class Repository {
  readonly channel = Channel
  readonly chat = Chat
  readonly checkout = Checkout
  readonly city = City
  readonly file = File
  readonly kitchen = Kitchen
  readonly media = Media
  readonly menu = Menu
  readonly notification = Notification
  readonly payment = Payment
  readonly permission = Permission
  readonly post = Post
  readonly print = Print
  readonly product = Product
  readonly task = Task
  readonly user = User

  async checkHealth(): Promise<boolean> {
    await useDatabase().query.users.findFirst()
    return true
  }
}

export const repository = new Repository()
