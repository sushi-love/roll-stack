import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import type * as tables from './tables'

export type { Database } from './connection'

export type User = InferSelectModel<typeof tables.users>
export type UserDraft = InferInsertModel<typeof tables.users>

export type Chat = InferSelectModel<typeof tables.chats>
export type ChatDraft = InferInsertModel<typeof tables.chats>

export type ChatMessage = InferSelectModel<typeof tables.chatMessages>
export type ChatMessageDraft = InferInsertModel<typeof tables.chatMessages>

export type ChatMember = InferSelectModel<typeof tables.chatMembers>
export type ChatMemberDraft = InferInsertModel<typeof tables.chatMembers>

export type Menu = InferSelectModel<typeof tables.menus>
export type MenuDraft = InferInsertModel<typeof tables.menus>

export type MenuCategory = InferSelectModel<typeof tables.menuCategories>
export type MenuCategoryDraft = InferInsertModel<typeof tables.menuCategories>

export type Product = InferSelectModel<typeof tables.products>
export type ProductDraft = InferInsertModel<typeof tables.products>

export type ProductVariant = InferSelectModel<typeof tables.productVariants>
export type ProductVariantDraft = InferInsertModel<typeof tables.productVariants>

export type ProductsInMenuCategory = InferSelectModel<typeof tables.productsInMenuCategories>
export type ProductsInMenuCategoryDraft = InferInsertModel<typeof tables.productsInMenuCategories>

export type Media = InferSelectModel<typeof tables.media>
export type MediaDraft = InferInsertModel<typeof tables.media>

export type MediaItem = InferSelectModel<typeof tables.mediaItems>
export type MediaItemDraft = InferInsertModel<typeof tables.mediaItems>
