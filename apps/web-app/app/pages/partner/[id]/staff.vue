<template>
  <Content>
    <div class="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 2xl:grid-cols-6">
      <UserCard
        v-for="staff in partner?.users"
        :key="staff.id"
        :user="staff"
      />
    </div>
  </Content>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { params } = useRoute('partner-id')

const partnerStore = usePartnerStore()
const partner = computed(() => partnerStore.partners.find((partner) => partner.id === params.id))

useHead({
  title: t('app.menu.staff'),
})
</script>
