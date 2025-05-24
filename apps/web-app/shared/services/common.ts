import { type } from 'arktype'

export const weightUnitSchema = type('"G" | "KG" | "ML" | "L" | "OZ" | "LB"')
export type WeightUnit = typeof weightUnitSchema.infer
