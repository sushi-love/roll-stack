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
