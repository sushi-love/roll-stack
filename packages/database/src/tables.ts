import { cuid2 } from 'drizzle-cuid2/postgres'
import { relations } from 'drizzle-orm'
import { boolean, date, integer, numeric, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

type UserType = 'staff' | 'head' | 'partner' | 'guest' | 'bot'
type UserGender = 'male' | 'female' | 'unknown'

type WeightUnit = 'G' | 'KG' | 'ML' | 'L' | 'OZ' | 'LB'

type MediaFormat = 'jpg' | 'webp'

type NotificationType = 'task_completed'

type ResolutionType = 'success' | 'failure' | 'unknown'

type CheckoutStatus = 'forming'
  | 'canceled'
  | 'created'
  | 'confirmed'
  | 'cooking'
  | 'prepared'
  | 'on_delivery'
  | 'at_client'
type CheckoutDeliveryMethod = 'delivery' | 'pickup'

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
  priority: integer('priority').notNull().default(0),
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

export const productVariantsOnMenuCategories = pgTable('product_variants_on_menu_categories', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  productInMenuCategoryId: cuid2('product_in_menu_category_id').notNull().references(() => productsInMenuCategories.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  productVariantId: cuid2('product_variant_id').notNull().references(() => productVariants.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const productTags = pgTable('product_tags', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  name: varchar('name').notNull(),
})

export const productTagsOnProducts = pgTable('product_tags_on_products', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  productId: cuid2('product_id').notNull().references(() => products.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  productTagId: cuid2('product_tag_id').notNull().references(() => productTags.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const productVariantTags = pgTable('product_variant_tags', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  name: varchar('name').notNull(),
})

export const productVariantTagsOnProductVariants = pgTable('product_variant_tags_on_product_variants', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  productVariantId: cuid2('product_variant_id').notNull().references(() => productVariants.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  productVariantTagId: cuid2('product_variant_tag_id').notNull().references(() => productVariantTags.id, {
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
  date: date('date', { mode: 'string' }),
  resolution: varchar('resolution').$type<ResolutionType>(),
  report: varchar('report'),
  performerId: cuid2('performer_id').references(() => users.id),
  listId: cuid2('list_id').notNull().references(() => taskLists.id),
})

export const taskLists = pgTable('task_lists', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  name: varchar('name').notNull(),
  userId: cuid2('user_id').references(() => users.id),
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

export const checkouts = pgTable('checkouts', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  status: varchar('status').notNull().$type<CheckoutStatus>(),
  deliveryMethod: varchar('delivery_method').notNull().$type<CheckoutDeliveryMethod>(),
  itemsPrice: numeric('items_price', { mode: 'number' }).notNull().default(0),
  deliveryPrice: numeric('delivery_price', { mode: 'number' }).notNull().default(0),
  totalPrice: numeric('total_price', { mode: 'number' }).notNull().default(0),
  name: varchar('name'),
  phone: varchar('phone'),
})

export const checkoutItems = pgTable('checkout_items', {
  id: cuid2('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  quantity: integer('quantity').notNull().default(1),
  unitPrice: numeric('unit_price', { mode: 'number' }).notNull().default(0),
  totalPrice: numeric('total_price', { mode: 'number' }).notNull().default(0),
  productVariantId: cuid2('product_variant_id').notNull().references(() => productVariants.id),
  checkoutId: cuid2('checkout_id').notNull().references(() => checkouts.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const userRelations = relations(users, ({ many, one }) => ({
  chatMessages: many(chatMessages),
  chatMembers: many(chatMembers),
  notifications: many(notifications),
  tasks: many(tasks),
  taskLists: many(taskLists),
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
  taskLists: many(taskLists),
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
  tags: many(productTagsOnProducts),
}))

export const productVariantRelations = relations(productVariants, ({ one, many }) => ({
  product: one(products, {
    fields: [productVariants.productId],
    references: [products.id],
  }),
  tags: many(productVariantTagsOnProductVariants),
}))

export const productsInMenuCategoriesRelations = relations(productsInMenuCategories, ({ one, many }) => ({
  category: one(menuCategories, {
    fields: [productsInMenuCategories.menuCategoryId],
    references: [menuCategories.id],
  }),
  product: one(products, {
    fields: [productsInMenuCategories.productId],
    references: [products.id],
  }),
  productVariants: many(productVariantsOnMenuCategories),
}))

export const productVariantsOnMenuCategoriesRelations = relations(productVariantsOnMenuCategories, ({ one }) => ({
  productInMenuCategory: one(productsInMenuCategories, {
    fields: [productVariantsOnMenuCategories.productInMenuCategoryId],
    references: [productsInMenuCategories.id],
  }),
  productVariant: one(productVariants, {
    fields: [productVariantsOnMenuCategories.productVariantId],
    references: [productVariants.id],
  }),
}))

export const productTagsOnProductsRelations = relations(productTagsOnProducts, ({ one }) => ({
  product: one(products, {
    fields: [productTagsOnProducts.productId],
    references: [products.id],
  }),
  productTag: one(productTags, {
    fields: [productTagsOnProducts.productTagId],
    references: [productTags.id],
  }),
}))

export const productVariantTagsOnProductVariantsRelations = relations(productVariantTagsOnProductVariants, ({ one }) => ({
  productVariant: one(productVariants, {
    fields: [productVariantTagsOnProductVariants.productVariantId],
    references: [productVariants.id],
  }),
  productVariantTag: one(productVariantTags, {
    fields: [productVariantTagsOnProductVariants.productVariantTagId],
    references: [productVariantTags.id],
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
  performer: one(users, {
    fields: [tasks.performerId],
    references: [users.id],
  }),
  list: one(taskLists, {
    fields: [tasks.listId],
    references: [taskLists.id],
  }),
}))

export const taskListRelations = relations(taskLists, ({ many, one }) => ({
  tasks: many(tasks),
  user: one(users, {
    fields: [taskLists.userId],
    references: [users.id],
  }),
  chat: one(chats, {
    fields: [taskLists.chatId],
    references: [chats.id],
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

export const checkoutRelations = relations(checkouts, ({ many }) => ({
  items: many(checkoutItems),
}))

export const checkoutItemRelations = relations(checkoutItems, ({ one }) => ({
  checkout: one(checkouts, {
    fields: [checkoutItems.checkoutId],
    references: [checkouts.id],
  }),
  productVariant: one(productVariants, {
    fields: [checkoutItems.productVariantId],
    references: [productVariants.id],
  }),
}))
