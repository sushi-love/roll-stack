<template>
  <Header :title="t('common.staff')" />

  <Content>
    <div class="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div class="flex flex-col gap-2.5">
        <img
          :src="data?.avatar ?? undefined"
          alt=""
          class="w-full rounded-lg"
        >

        <UButton
          variant="solid"
          color="secondary"
          size="lg"
          label="Написать"
          icon="i-lucide-message-square-text"
          block
        />
      </div>
    </div>

    <div class="flex flex-row items-center gap-2.5">
      <h2 class="text-xl md:text-3xl font-bold">
        {{ data?.name }} {{ data?.surname }}
      </h2>
    </div>

    <p class="text-sm text-muted">
      Описание, контакты, какие вопросы может решать, какие задачи может выполнять...
    </p>
  </Content>
</template>

<script setup lang="ts">
import type { User } from '~~/types'

const { t } = useI18n()
const { params } = useRoute('staff-id')

const { data, error } = await useFetch<User>(`/api/user/${params.id}`)
if (error.value) {
  await navigateTo('/')
}
</script>
