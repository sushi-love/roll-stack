<template>
  <div class="relative cursor-default" :class="getSizeClass()">
    <UIcon
      :name="getIconByScore(score)"
      :class="getIconClass()"
      class="shadow-2xl"
    />
    <h4 class="absolute bottom-1 left-1 font-semibold text-white" :class="getScoreClass()">
      {{ score }}
    </h4>
  </div>
</template>

<script setup lang="ts">
const { size = 'md', score } = defineProps<{
  score: number
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

function getScoreClass() {
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

function getIconByScore(score: number) {
  if (score < 10) {
    return 'fluent:circle-48-filled'
  } else if (score < 20) {
    return 'fluent:triangle-48-filled'
  } else if (score < 30) {
    return 'fluent:square-48-filled'
  } else if (score < 40) {
    return 'fluent:pentagon-48-filled'
  } else {
    return 'fluent:hexagon-48-filled'
  }
}

function getColorByScore(score: number) {
  if (score < 10) {
    return 'text-rose-400'
  } else if (score < 20) {
    return 'text-orange-400'
  } else if (score < 30) {
    return 'text-yellow-400'
  } else if (score < 40) {
    return 'text-green-400'
  } else {
    return 'text-purple-400'
  }
}

function getIconClass() {
  return `${getSizeClass()} ${getColorByScore(score)} drop-shadow-2xl`
}
</script>
