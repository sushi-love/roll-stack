<template>
  <h1 class="pt-8 mb-4 md:mb-8 text-3xl md:text-4xl font-medium text-center">
    {{ $t('storefront.finish.title') }}
  </h1>

  <div class="p-3 md:p-6 bg-elevated/50 rounded-2xl space-y-8">
    <h2 class="text-center font-medium text-xl">
      {{ $t('storefront.finish.success-message') }} {{ $t('storefront.finish.expect-call') }}
    </h2>

    <div class="flex flex-col gap-1.5">
      <h3 class="font-medium text-xl/6">
        {{ checkoutData?.deliveryMethod === 'pickup' ? $t('storefront.cart.pickup') : $t('storefront.cart.delivery') }}
      </h3>

      <p>
        <span class="text-muted">Код заявки:</span> <span class="font-medium">{{ checkoutData?.id }}</span>
      </p>
      <p>
        <span class="text-muted">{{ $t('storefront.checkout.your-name') }}:</span> <span class="font-medium">{{ checkoutData?.name }}</span>
      </p>
      <p>
        <span class="text-muted">{{ $t('storefront.checkout.your-phone') }}:</span> <span class="font-medium">{{ checkoutData?.phone }}</span>
      </p>

      <!-- <p v-if="checkoutData?.time">
        {{ $t('storefront.checkout.time-title') }}: <span class="font-medium">{{ checkoutData.timeType === 'ASAP' ? $t('storefront.checkout.as-soon-as-possible') : new Date(checkoutData.time).toLocaleString(undefined, {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }) }}</span>
      </p> -->
      <div>
        <span class="text-muted">{{ $t('storefront.checkout.address.title') }}: </span>
        <p v-if="checkoutData?.deliveryMethod === 'pickup'" class="inline font-medium">
          {{ kitchen?.address }}
        </p>
        <p v-if="checkoutData?.deliveryMethod === 'delivery'" class="inline font-medium">
          <span>{{ checkoutData?.street }}</span>
          <span v-if="checkoutData?.flat" class="lowercase">, {{ $t('storefront.checkout.address.flat') }} {{ checkoutData.flat }}</span>
          <span v-if="checkoutData?.intercom" class="lowercase">, {{ $t('storefront.checkout.address.intercom') }} {{ checkoutData.intercom }}</span>
          <span v-if="checkoutData?.entrance" class="lowercase">, {{ $t('storefront.checkout.address.entrance') }} {{ checkoutData.entrance }}</span>
          <span v-if="checkoutData?.floor" class="lowercase">, {{ $t('storefront.checkout.address.floor') }} {{ checkoutData.floor }}</span>
          <span v-if="checkoutData?.addressNote">. {{ checkoutData?.addressNote }}</span>
        </p>
      </div>

      <!-- <p>{{ $t('storefront.checkout.payment-title') }}: <span class="font-medium">{{ paymentMethod }}</span></p> -->
      <p v-if="checkoutData?.cashAmount">
        <span class="text-muted">{{ $t('storefront.checkout.change-label') }}:</span> <span class="font-medium">{{ checkoutData.cashAmount }} {{ channelStore.currencySign }}</span>
      </p>
      <p v-if="checkoutData?.note">
        <span class="text-muted">{{ $t('storefront.checkout.order-note') }}:</span> <span class="font-medium">{{ checkoutData.note }}</span>
      </p>
    </div>

    <div class="flex flex-col gap-3">
      <h3 class="font-medium text-xl/6">
        {{ $t('storefront.finish.ordered-title') }}
      </h3>

      <CheckoutItem
        v-for="item in checkoutData?.items"
        :key="item.id"
        :item="item"
        :can-be-changed="false"
      />
    </div>

    <div class="flex flex-col gap-1">
      <div class="flex flex-row justify-between">
        <div>{{ $t('storefront.checkout.cost.products') }}</div>
        <div class="tracking-tight text-lg">
          {{ checkoutData?.itemsPrice }} <span class="text-sm">{{ channelStore.currencySign }}</span>
        </div>
      </div>
      <div v-if="checkoutData?.deliveryPrice" class="flex flex-row justify-between">
        <div>{{ $t('storefront.checkout.cost.delivery') }}</div>
        <div class="tracking-tight text-lg">
          {{ checkoutData.deliveryPrice }} <span class="text-sm">{{ channelStore.currencySign }}</span>
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <div>Итоговая стоимость</div>
        <div class="tracking-tight text-lg">
          {{ checkoutData?.totalPrice }} <span class="text-sm">{{ channelStore.currencySign }}</span>
        </div>
      </div>
    </div>

    <UButton
      to="/"
      variant="gradient"
      size="xl"
      block
    >
      {{ $t('common.to-home') }}
    </UButton>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'finish',
})

const route = useRoute()

const channelStore = useChannelStore()
const checkoutStore = useCheckoutStore()

const checkoutData = await checkoutStore.get(route.query.id?.toString() as string)
if (!checkoutData) {
  await navigateTo('/')
}

const kitchen = computed(() => channelStore.kitchens.find((w) => w.id === checkoutData?.kitchenId))

// const paymentMethod = computed(() => getLocaleValue({ values: channel.paymentMethods.find((p) => p.id === checkoutData?.paymentMethodId)?.name, locale: locale.value, defaultLocale: channel.defaultLocale }))
</script>
