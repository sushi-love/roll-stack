import { boolean, pgTable, varchar } from 'drizzle-orm/pg-core'

export const houses = pgTable('houses', {
  id: varchar('id').primaryKey(),
  number: varchar('number').notNull(),
  type: varchar('type').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  fiasId: varchar('fias_id'),
  parentId: varchar('parent_id'),
})

export const objects = pgTable('objects', {
  id: varchar('id').primaryKey(),
  name: varchar('name').notNull(),
  type: varchar('type'),
  level: varchar('level').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  fiasId: varchar('fias_id'),
  parentId: varchar('parent_id'),
})
