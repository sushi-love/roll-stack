<template>
  <Header :title="$t('app.menu.my-space')" />

  <Content>
    <div class="flex flex-col gap-5">
      <h2 class="text-xl md:text-3xl font-bold">
        {{ user.name }}, привет!
      </h2>
      <p>Чем займемся сегодня?</p>
    </div>
  </Content>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['01-auth-only'],
})

const user = useUserStore()

useHead({
  title: 'Суши Атриум',
  meta: [
    {
      name: 'description',
      content: 'Место, где бизнес-задачи превращаются в особые события.',
    },
  ],
})
</script>
