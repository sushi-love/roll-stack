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
