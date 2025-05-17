export function getCategoryInfo(category: string) {
  if (category === 'development') {
    return {
      title: 'Разработка',
      icon: 'i-lucide-cog',
    }
  }
  if (category === 'milestone') {
    return {
      title: 'Значимая веха',
      icon: 'i-lucide-flag',
    }
  }
}
