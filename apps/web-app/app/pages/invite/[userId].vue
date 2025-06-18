<template>
  <div class="w-full flex justify-center">
    <div v-confetti="{ stageHeight: height, stageWidth: width, particleCount: 200, duration: 5000 }" />
  </div>

  <UContainer class="mt-16 max-w-md flex flex-col gap-4">
    <div class="mb-6">
      <h1 class="text-2xl md:text-3xl font-bold">
        Вот так встреча!
      </h1>
      <p>Укажите свои данные и начните работу</p>
    </div>

    <img
      :src="data?.avatarUrl ?? undefined"
      alt=""
      class="w-32 rounded-lg"
    >

    <FormCompleteUser :user-id="params.userId" />
  </UContainer>
</template>

<script setup lang="ts">
import { vConfetti } from '@neoconfetti/vue'

definePageMeta({
  layout: 'empty',
  middleware: ['02-guest-only'],
})

const { params } = useRoute('invite-userId')
const { width, height } = useWindowSize()

const { data, error } = await useFetch(`/api/user/${params.userId}`)
if (error.value) {
  await navigateTo('/')
}

useHead({
  title: 'Регистрация нового пользователя',
})
</script>
