import { cuid2 } from 'drizzle-cuid2/postgres'
import { relations } from 'drizzle-orm'
import { boolean, integer, numeric, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

type UserType = 'staff' | 'head' | 'partner' | 'guest' | 'bot'
type UserGender = 'male' | 'female' | 'unknown'

type WeightUnit = 'G' | 'KG' | 'ML' | 'L' | 'OZ' | 'LB'

type MediaFormat = 'jpg' | 'webp'

type NotificationType = 'task_completed'

type ResolutionType = 'success' | 'failure' | 'unknown'

export const users = pgTable('users', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  type: varchar('type').notNull().$type<UserType>(),
  gender: varchar('gender').notNull().default('unknown').$type<UserGender>(),
  name: varchar('name').notNull(),
  surname: varchar('surname').notNull().default(''),
  caption: varchar('caption').notNull().default(''),
  email: varchar('email').unique(),
  phone: varchar('phone').unique(),
  avatarUrl: varchar('avatar_url'),
  prestige: integer('prestige').notNull().default(0),
  focusedTaskId: cuid2('focused_task_id'),
})

export const chats = pgTable('chats', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  name: varchar('name').notNull(),
  description: varchar('description'),
  lastMessageId: cuid2('last_message_id'),
})

export const chatMessages = pgTable('chat_messages', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  text: varchar('text'),
  chatId: cuid2('chat_id').notNull().references(() => chats.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  userId: cuid2('user_id').notNull().references(() => users.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const chatMembers = pgTable('chat_members', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  chatId: cuid2('chat_id').notNull().references(() => chats.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  userId: cuid2('user_id').notNull().references(() => users.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const menus = pgTable('menus', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  slug: varchar('slug').notNull(),
  name: varchar('name').notNull(),
  isActive: boolean('is_active').notNull().default(false),
})

export const menuCategories = pgTable('menu_categories', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  slug: varchar('slug').notNull(),
  name: varchar('name').notNull(),
  icon: varchar('icon'),
  menuId: cuid2('menu_id').notNull().references(() => menus.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const products = pgTable('products', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  slug: varchar('slug').notNull(),
  isAvailableForPurchase: boolean('is_available_for_purchase').notNull().default(true),
  name: varchar('name').notNull(),
  description: varchar('description').notNull(),
  mediaId: cuid2('media_id').references(() => media.id),
})

export const productVariants = pgTable('product_variants', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  name: varchar('name').notNull(),
  weightValue: numeric('weight_value', { mode: 'number' }).notNull(),
  weightUnit: varchar('weight_unit').notNull().$type<WeightUnit>(),
  gross: numeric('gross', { mode: 'number' }).notNull(),
  net: numeric('net', { mode: 'number' }),
  calories: numeric('calories', { mode: 'number' }),
  protein: numeric('protein', { mode: 'number' }),
  fat: numeric('fat', { mode: 'number' }),
  carbohydrate: numeric('carbohydrate', { mode: 'number' }),
  sku: varchar('sku'),
  productId: cuid2('product_id').notNull().references(() => products.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const productsInMenuCategories = pgTable('products_in_menu_categories', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  menuCategoryId: cuid2('menu_category_id').notNull().references(() => menuCategories.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  productId: cuid2('product_id').notNull().references(() => products.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const media = pgTable('media', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
})

export const mediaItems = pgTable('media_items', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  url: varchar('url').notNull(),
  size: integer('size').notNull(),
  format: varchar('format').notNull().$type<MediaFormat>(),
  mediaId: cuid2('media_id').notNull().references(() => media.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const tasks = pgTable('tasks', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  completedAt: timestamp('completed_at', { precision: 3, withTimezone: true, mode: 'string' }),
  name: varchar('name').notNull(),
  description: varchar('description'),
  resolution: varchar('resolution').$type<ResolutionType>(),
  report: varchar('report'),
  performerId: cuid2('performer_id').references(() => users.id),
  chatId: cuid2('chat_id').references(() => chats.id),
})

export const notifications = pgTable('notifications', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  type: varchar('type').notNull().$type<NotificationType>(),
  title: varchar('title').notNull(),
  description: varchar('description').notNull(),
  userId: cuid2('user_id').notNull().references(() => users.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  taskId: cuid2('task_id').references(() => tasks.id),
})

export const userRelations = relations(users, ({ many, one }) => ({
  chatMessages: many(chatMessages),
  chatMembers: many(chatMembers),
  notifications: many(notifications),
  tasks: many(tasks),
  focusedTask: one(tasks, {
    fields: [users.focusedTaskId],
    references: [tasks.id],
  }),
}))

export const chatRelations = relations(chats, ({ many, one }) => ({
  messages: many(chatMessages),
  members: many(chatMembers),
  lastMessage: one(chatMessages, {
    fields: [chats.lastMessageId],
    references: [chatMessages.id],
  }),
  tasks: many(tasks),
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

export const menuRelations = relations(menus, ({ many }) => ({
  categories: many(menuCategories),
}))

export const menuCategoryRelations = relations(menuCategories, ({ many, one }) => ({
  menu: one(menus, {
    fields: [menuCategories.menuId],
    references: [menus.id],
  }),
  products: many(productsInMenuCategories),
}))

export const productRelations = relations(products, ({ many, one }) => ({
  variants: many(productVariants),
  categories: many(productsInMenuCategories),
  media: one(media, {
    fields: [products.mediaId],
    references: [media.id],
  }),
}))

export const productVariantRelations = relations(productVariants, ({ one }) => ({
  product: one(products, {
    fields: [productVariants.productId],
    references: [products.id],
  }),
}))

export const productsInMenuCategoriesRelations = relations(productsInMenuCategories, ({ one }) => ({
  category: one(menuCategories, {
    fields: [productsInMenuCategories.menuCategoryId],
    references: [menuCategories.id],
  }),
  product: one(products, {
    fields: [productsInMenuCategories.productId],
    references: [products.id],
  }),
}))

export const mediaRelations = relations(media, ({ many }) => ({
  items: many(mediaItems),
}))

export const mediaItemRelations = relations(mediaItems, ({ one }) => ({
  media: one(media, {
    fields: [mediaItems.mediaId],
    references: [media.id],
  }),
}))

export const taskRelations = relations(tasks, ({ one }) => ({
  chat: one(chats, {
    fields: [tasks.chatId],
    references: [chats.id],
  }),
  performer: one(users, {
    fields: [tasks.performerId],
    references: [users.id],
  }),
}))

export const notificationRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
  task: one(tasks, {
    fields: [notifications.taskId],
    references: [tasks.id],
  }),
}))
