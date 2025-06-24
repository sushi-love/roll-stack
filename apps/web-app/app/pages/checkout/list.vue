<template>
  <Header title="Заявки" />

  <Content>
    <ClientOnly>
      <div class="max-w-md grid grid-cols-1 gap-4">
        <CheckoutCard
          v-for="checkout in checkoutStore.checkouts"
          :id="checkout.id"
          :key="checkout.id"
        />
      </div>
    </ClientOnly>
  </Content>
</template>

<script setup lang="ts">
const checkoutStore = useCheckoutStore()

let interval: NodeJS.Timeout

onMounted(async () => {
  await Promise.all([
    checkoutStore.update(),
    checkoutStore.updateKitchens(),
    checkoutStore.updatePaymentMethods(),
  ])

  interval = setInterval(async () => {
    await checkoutStore.update()
  }, 4000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>
