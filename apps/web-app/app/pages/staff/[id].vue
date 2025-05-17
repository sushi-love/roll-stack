<template>
  <Header :title="t('common.staff')" />

  <Content>
    <img
      :src="data?.avatar ?? undefined"
      alt=""
      class="aspect-square w-52 rounded-lg"
    >

    <div class="flex flex-row items-center gap-2.5">
      <h2 class="text-xl md:text-3xl font-bold">
        {{ data?.name }} {{ data?.surname }}
      </h2>
    </div>

    <p class="text-sm text-muted">
      Название ...
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
