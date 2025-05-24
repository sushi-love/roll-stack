<template>
  <div
    class="ring ring-default/50 h-full min-h-40 rounded-lg bg-elevated/25 cursor-pointer hover:scale-98 active:scale-95 duration-200"
    :class="getPaddingClass(padding)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
type Padding = 'none' | 'xs' | 'sm' | 'md'

const { padding = 'md' } = defineProps<{ padding?: Padding }>()

function getPaddingClass(p: Padding) {
  switch (p) {
    case 'none':
      return ''
    case 'xs':
      return 'p-2'
    case 'sm':
      return 'p-4'
    case 'md':
      return 'p-6'
    default:
      return ''
  }
}
</script>
