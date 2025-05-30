import type { Resolution } from '../services/task'

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
