export interface User {
  id: string
  name: string
  surname: string
  email: string
  avatar: string | null
  prestige: number
}

export interface Chat {
  id: string
  createdAt: string
  name: string
  messages: Message[]
  lastMessage: Message
  members: User[]
}

export interface Message {
  id: string
  createdAt: string
  chatId: string
  userId: string
  text: string
}

export interface Mail {
  id: number
  unread?: boolean
  from: User
  subject: string
  body: string
  date: string
}
