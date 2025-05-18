function _useApp() {
  const route = useRoute()

  const isNavbarOpened = ref(false)
  const imagesMode = ref<'color' | 'grayscale'>('color')

  watch(
    () => route.fullPath,
    () => {
      isNavbarOpened.value = false
    },
  )

  return {
    isNavbarOpened,
    imagesMode,
  }
}

export const useApp = createSharedComposable(_useApp)
