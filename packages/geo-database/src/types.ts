import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import type * as tables from './tables'

export type { Database } from './connection'

export type House = InferSelectModel<typeof tables.houses>
export type HouseDraft = InferInsertModel<typeof tables.houses>

export type Object = InferSelectModel<typeof tables.objects>
export type ObjectDraft = InferInsertModel<typeof tables.objects>
