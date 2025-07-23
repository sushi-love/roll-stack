import { type } from 'arktype'

export const createPartnerLegalEntitySchema = type({
  inn: type('8 <= string <= 16').describe('error.length.invalid'),
  ogrnip: type('8 <= string <= 25 | undefined').describe('error.length.invalid').optional(),
  name: type('8 <= string <= 150').describe('error.length.invalid'),
  comment: type('string | undefined').describe('error.length.invalid').optional(),
})
export type CreatePartnerLegalEntity = typeof createPartnerLegalEntitySchema.infer

export const updatePartnerLegalEntitySchema = type({
  inn: type('8 <= string <= 16 | undefined').describe('error.length.invalid').optional(),
  ogrnip: type('8 <= string <= 25 | undefined').describe('error.length.invalid').optional(),
  name: type('8 <= string <= 150 | undefined').describe('error.length.invalid').optional(),
  comment: type('string | undefined').describe('error.length.invalid').optional(),
})
export type UpdatePartnerLegalEntity = typeof updatePartnerLegalEntitySchema.infer

export const createPartnerAgreementSchema = type({
  concludedAt: type('string').describe('error.length.invalid'),
  willEndAt: type('string').describe('error.length.invalid').optional(),
  internalId: type('string').describe('error.length.invalid'),
  royalty: type('number').describe('error.length.invalid'),
  minRoyaltyPerMonth: type('number').describe('error.length.invalid'),
  lumpSumPayment: type('number').describe('error.length.invalid'),
  legalEntityId: type('string').describe('error.length.invalid'),
  comment: type('string | undefined').describe('error.length.invalid').optional(),
})
export type CreatePartnerAgreement = typeof createPartnerAgreementSchema.infer

export const updatePartnerAgreementSchema = type({
  concludedAt: type('string | undefined').describe('error.length.invalid').optional(),
  willEndAt: type('string | undefined').describe('error.length.invalid').optional(),
  internalId: type('string | undefined').describe('error.length.invalid').optional(),
  royalty: type('number | undefined').describe('error.length.invalid').optional(),
  minRoyaltyPerMonth: type('number | undefined').describe('error.length.invalid').optional(),
  lumpSumPayment: type('number | undefined').describe('error.length.invalid').optional(),
  legalEntityId: type('string | undefined').describe('error.length.invalid').optional(),
  comment: type('string | undefined').describe('error.length.invalid').optional(),
})
export type UpdatePartnerAgreement = typeof updatePartnerAgreementSchema.infer
