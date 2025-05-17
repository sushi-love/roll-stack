<template>
  <Header :title="t('app.menu.our-partners')" />

  <Content>
    <div class="mb-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4.5">
      <NuxtLink
        v-for="partner in user.users"
        :key="partner.id"
        :to="`/partner/${partner.id}`"
      >
        <PartnerCard :user="partner" />
      </NuxtLink>
    </div>
  </Content>
</template>

<script setup lang="ts">
const { t } = useI18n()

const user = useUserStore()
</script>
