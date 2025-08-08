import type { User } from '@roll-stack/database'
import type { Resolution } from '../services/task'

export function getResolutionForSelect(): { value: Resolution, label: string, icon: string }[] {
  return [
    { value: 'success', label: 'Успешно выполнена', icon: 'i-lucide-circle-check' },
    { value: 'failure', label: 'Не выполнена', icon: 'i-lucide-circle-x' },
    { value: 'unknown', label: 'Не ясно, есть вопросы', icon: 'i-lucide-circle-help' },
  ]
}

export function getLocalizedResolution(resolution: Resolution) {
  switch (resolution) {
    case 'success':
      return 'Успешно выполнена'
    case 'failure':
      return 'Не выполнена'
    case 'unknown':
      return 'Не ясно, есть вопросы'
  }
}

export function getResolutionIcon(resolution: Resolution) {
  switch (resolution) {
    case 'success':
      return 'i-lucide-circle-check'
    case 'failure':
      return 'i-lucide-circle-x'
    case 'unknown':
      return 'i-lucide-circle-help'
  }
}

export function getUserTypeLabel(type: User['type']): string {
  switch (type) {
    case 'partner':
      return 'Партнер'
    case 'staff':
      return 'Сотрудник сети'
    default:
      return ''
  }
}

export function getAgreementProgressPercentage(concludedAt?: string | null, willEndAt?: string | null): number {
  if (!concludedAt || !willEndAt) {
    return 0
  }

  const now = new Date()
  const concludedAtDate = new Date(concludedAt)
  const willEndAtDate = new Date(willEndAt)

  const total = willEndAtDate.getTime() - concludedAtDate.getTime()
  const elapsed = now.getTime() - concludedAtDate.getTime()
  const percentage = 100 - (elapsed / total) * 100
  const res = Math.floor(percentage)

  return Math.min(100, Math.max(0, res))
}

export function pluralizationRu(int: number, array: [string, string, string]): string {
  const n = Math.abs(int)

  let idx: 1 | 2 | 0
  // @see http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html
  if (n % 10 === 1 && n % 100 !== 11) {
    idx = 0 // one
  } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
    idx = 1 // few
  } else {
    idx = 2 // many
  }

  return array[idx]
}

export const formatNumber = new Intl.NumberFormat('ru', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format
