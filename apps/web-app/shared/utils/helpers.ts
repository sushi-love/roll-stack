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
