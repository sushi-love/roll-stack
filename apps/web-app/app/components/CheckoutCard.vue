<template>
  <div class="bg-elevated/50 rounded-lg px-4 md:px-6 py-5 space-y-6">
    <div>
      <div class="mb-2 flex flex-row gap-3 items-center">
        <img
          :src="`/api/avatar/${checkout?.phone}.svg?emotion=8`"
          width="40"
          height="40"
          alt=""
          class="size-12 rounded-full"
        >
        <h3 class="text-xl font-semibold">
          {{ checkout?.deliveryMethod === 'pickup' ? $t('storefront.cart.pickup') : $t('storefront.cart.delivery') }}
        </h3>
      </div>

      <p class="font-medium">
        <span class="text-neutral-500 dark:text-neutral-400 font-normal">{{ $t('storefront.checkout.name') }}:</span> {{ checkout?.name }}
      </p>
      <p class="font-medium mb-2">
        <span class="text-neutral-500 dark:text-neutral-400 font-normal">{{ $t('storefront.checkout.phone') }}:</span> {{ checkout?.phone }}
      </p>

      <!-- <p v-if="checkout?.time" class="font-medium">
        <span class="text-neutral-500 dark:text-neutral-400 font-normal">{{ $t('storefront.checkout.time-title') }}:</span> {{ checkout?.timeType === 'ASAP' ? $t('storefront.checkout.as-soon-as-possible') : new Date(checkout?.time).toLocaleString(undefined, {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }) }}
      </p> -->

      <div class="font-medium">
        <span class="text-neutral-500 dark:text-neutral-400 font-normal pr-1">{{ $t('storefront.checkout.address.title') }}:</span>
        <p v-if="checkout?.deliveryMethod === 'pickup'" class="inline">
          {{ kitchen?.address }}
        </p>
        <p v-if="checkout?.deliveryMethod === 'delivery'" class="inline">
          <span>{{ checkout.street }}</span>
          <span v-if="checkout?.flat" class="lowercase">, {{ $t('storefront.checkout.address.flat') }} {{ checkout.flat }}</span>
          <span v-if="checkout?.intercom" class="lowercase">, {{ $t('storefront.checkout.address.intercom') }} {{ checkout.intercom }}</span>
          <span v-if="checkout?.entrance" class="lowercase">, {{ $t('storefront.checkout.address.entrance') }} {{ checkout.entrance }}</span>
          <span v-if="checkout?.floor" class="lowercase">, {{ $t('storefront.checkout.address.floor') }} {{ checkout.floor }}</span>
          <span v-if="checkout?.addressNote">. {{ checkout.addressNote }}</span>
        </p>
      </div>

      <!-- <p class="font-medium">
        <span class="text-neutral-500 dark:text-neutral-400 font-normal">{{ $t('storefront.checkout.payment-title') }}:</span> {{ paymentMethod }}
      </p> -->
      <p v-if="checkout?.cashAmount" class="font-medium">
        <span class="text-neutral-500 dark:text-neutral-400 font-normal">{{ $t('storefront.checkout.change-label') }}:</span> {{ checkout?.cashAmount }} ₽
      </p>
      <p v-if="checkout?.note" class="font-medium">
        <span class="text-neutral-500 dark:text-neutral-400 font-normal">{{ $t('storefront.checkout.order-note') }}:</span> {{ checkout?.note }}
      </p>
    </div>

    <div class="flex flex-col gap-3">
      <CheckoutItem
        v-for="item in checkout?.items"
        :key="item.id"
        :item="item"
      />
    </div>

    <div>
      <div class="flex flex-row justify-between">
        <div class="text-neutral-500 dark:text-neutral-400">
          {{ $t('storefront.checkout.cost.products') }}
        </div>
        <div class="tracking-tight text-lg">
          {{ checkout?.itemsPrice }} <span class="text-sm">₽</span>
        </div>
      </div>

      <div v-if="checkout?.deliveryPrice" class="flex flex-row justify-between">
        <div class="text-neutral-500 dark:text-neutral-400">
          {{ $t('storefront.checkout.cost.delivery') }}
        </div>
        <div class="tracking-tight text-lg">
          {{ checkout?.deliveryPrice }} <span class="text-sm">₽</span>
        </div>
      </div>

      <div class="flex flex-row justify-between">
        <div class="text-neutral-500 dark:text-neutral-400">
          Итоговая стоимость
        </div>
        <div class="tracking-tight text-lg">
          {{ checkout?.totalPrice }} <span class="text-sm">₽</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { id } = defineProps<{
  id: string
}>()

// const channel = useChannelStore()
const checkoutStore = useCheckoutStore()

const checkout = computed(() => checkoutStore.checkouts?.find((c) => c.id === id))
const kitchen = computed(() => checkoutStore.kitchens?.find((w) => w.id === checkout.value?.kitchenId))

// const paymentMethod = computed(() => getLocaleValue({ values: channel.paymentMethods.find((p) => p.id === checkout.value?.paymentMethodId)?.name, locale: locale.value, defaultLocale: channel.defaultLocale }))
</script>
