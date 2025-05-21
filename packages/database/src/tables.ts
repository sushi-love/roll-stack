import { cuid2 } from 'drizzle-cuid2/postgres'
import { relations } from 'drizzle-orm'
import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

type UserType = 'staff' | 'head' | 'partner' | 'guest'

export const users = pgTable('users', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  type: varchar('type').notNull().$type<UserType>(),
  name: varchar('name').notNull(),
  surname: varchar('surname').notNull().default(''),
  caption: varchar('caption').notNull().default(''),
  email: varchar('email').unique(),
  phone: varchar('phone').unique(),
  avatarUrl: varchar('avatar_url'),
  prestige: integer('prestige').notNull().default(0),
})

export const chats = pgTable('chats', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  name: varchar('name').notNull(),
  lastMessageId: varchar('last_message_id'),
})

export const chatMessages = pgTable('chat_messages', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  chatId: varchar('chat_id').notNull(),
  userId: varchar('user_id').notNull(),
  text: varchar('text'),
})

export const chatMembers = pgTable('chat_members', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  chatId: varchar('chat_id').notNull(),
  userId: varchar('user_id').notNull(),
})

export const userRelations = relations(users, ({ many }) => ({
  chatMessages: many(chatMessages),
  chatMembers: many(chatMembers),
}))

export const chatRelations = relations(chats, ({ many, one }) => ({
  messages: many(chatMessages),
  members: many(chatMembers),
  lastMessage: one(chatMessages, {
    fields: [chats.lastMessageId],
    references: [chatMessages.id],
  }),
}))

export const chatMessageRelations = relations(chatMessages, ({ one }) => ({
  chat: one(chats, {
    fields: [chatMessages.chatId],
    references: [chats.id],
  }),
  user: one(users, {
    fields: [chatMessages.userId],
    references: [users.id],
  }),
}))

export const chatMemberRelations = relations(chatMembers, ({ one }) => ({
  chat: one(chats, {
    fields: [chatMembers.chatId],
    references: [chats.id],
  }),
  user: one(users, {
    fields: [chatMembers.userId],
    references: [users.id],
  }),
}))
