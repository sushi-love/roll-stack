<template>
  <Header :title="t('app.menu.our-staff')" />

  <Content>
    <div class="mb-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4.5">
      <NuxtLink
        v-for="staff in user.staff"
        :key="staff.id"
        :to="`/staff/${staff.id}`"
      >
        <StaffCard :staff="staff" />
      </NuxtLink>
    </div>
  </Content>
</template>

<script setup lang="ts">
const { t } = useI18n()

const user = useUserStore()
</script>
