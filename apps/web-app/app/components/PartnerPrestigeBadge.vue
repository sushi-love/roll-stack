<template>
  <div class="relative cursor-default" :class="getSizeClass()">
    <UIcon
      :name="getIconByPrestige(prestige)"
      :class="getIconClass()"
    />
    <h4 class="absolute bottom-1 left-0.5 font-bold tracking-tight text-white text-shadow-md" :class="getPrestigeClass()">
      {{ prestige }}
    </h4>
  </div>
</template>

<script setup lang="ts">
const { size = 'md', prestige } = defineProps<{
  prestige: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
}>()

function getSizeClass() {
  switch (size) {
    case 'sm':
      return 'size-8'
    case 'md':
      return 'size-12'
    case 'lg':
      return 'size-16'
    case 'xl':
      return 'size-20'
    default:
      return 'size-12'
  }
}

function getPrestigeClass() {
  switch (size) {
    case 'sm':
      return 'pl-[0.1rem] text-[0.9rem]'
    case 'md':
      return 'pl-[0.2rem] text-[1.4rem]'
    case 'lg':
      return 'pl-[0.3rem] text-[1.9rem]'
    case 'xl':
      return 'pl-[0.4rem] text-[2.4rem]'
    default:
      return 'pl-[0.2rem] text-[1.4rem]'
  }
}

function getIconByPrestige(prestige: number) {
  if (prestige < 10) {
    return 'fluent:circle-32-filled'
  } else if (prestige < 20) {
    return 'fluent:triangle-32-filled'
  } else if (prestige < 30) {
    return 'fluent:square-32-filled'
  } else if (prestige < 40) {
    return 'fluent:pentagon-32-filled'
  } else {
    return 'fluent:hexagon-32-filled'
  }
}

function getColorByPrestige(score: number) {
  if (score < 10) {
    return 'text-rose-400'
  } else if (score < 20) {
    return 'text-orange-400'
  } else if (score < 30) {
    return 'text-yellow-400'
  } else if (score < 40) {
    return 'text-lime-400'
  } else {
    return 'text-green-400'
  }
}

function getIconClass() {
  return `${getSizeClass()} ${getColorByPrestige(prestige)}`
}
</script>
