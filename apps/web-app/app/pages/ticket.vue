<template>
  <div class="h-svh grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-0">
    <div class="col-span-1 relative flex flex-col min-w-0 min-h-svh lg:not-last:border-r lg:not-last:border-default shrink-0 w-full">
      <div class="h-16 shrink-0 flex items-center justify-between border-b border-default px-4 sm:px-6 gap-1.5">
        <HeaderMenuButton />

        <h1 class="flex items-center gap-1.5 font-medium text-lg text-highlighted truncate">
          {{ $t('app.menu.tickets') }}
        </h1>
      </div>

      <div class="overflow-y-auto divide-y divide-default">
        <TicketListItem
          v-for="ticket in sortedTickets"
          :id="ticket.id"
          :key="ticket.id"
        />
      </div>
    </div>

    <div class="col-span-2 relative flex flex-col min-w-0 min-h-svh lg:not-last:border-r lg:not-last:border-default flex-1">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const ticketStore = useTicketStore()
const sortedTickets = computed(() => ticketStore.tickets.toSorted((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()))

useHead({
  title: t('app.menu.tickets'),
})
</script>
