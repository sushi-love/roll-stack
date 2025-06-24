<template>
  <template v-if="!checkoutStore.isEmpty">
    <h1 class="pt-8 mb-4 md:mb-8 text-3xl md:text-4xl font-medium">
      {{ $t('storefront.checkout.title') }}
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
      <div class="col-span-full md:col-span-7 space-y-6">
        <div class="p-3 md:p-6 bg-elevated/50 rounded-2xl flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <h3 class="text-lg md:text-xl font-medium">
              {{ $t('storefront.checkout.contacts') }}
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <UInput
                v-model="checkoutStore.phone"
                type="tel"
                size="xl"
                maxlength="17"
                :placeholder="$t('storefront.checkout.your-phone')"
                :ui="{
                  base: checkoutStore.isValidPhone && '!ring-secondary',
                }"
              />

              <UInput
                v-model="checkoutStore.name"
                size="xl"
                :placeholder="$t('storefront.checkout.your-name')"
              />
            </div>
          </div>

          <div v-if="checkoutStore?.deliveryMethod === 'delivery'" class="flex flex-col gap-2">
            <h3 class="text-lg md:text-xl font-medium">
              {{ $t('storefront.checkout.enter-address') }}
            </h3>
            <UFormField :label="$t('storefront.checkout.address.street')">
              <UInput
                v-model="checkoutStore.street"
                size="xl"
                class="w-full"
              />
            </UFormField>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
              <UFormField :label="$t('storefront.checkout.address.flat')">
                <UInput
                  v-model="checkoutStore.flat"
                  size="xl"
                />
              </UFormField>

              <UFormField :label="$t('storefront.checkout.address.intercom')">
                <UInput
                  v-model="checkoutStore.intercom"
                  size="xl"
                />
              </UFormField>

              <UFormField :label="$t('storefront.checkout.address.entrance')">
                <UInput
                  v-model="checkoutStore.entrance"
                  size="xl"
                />
              </UFormField>

              <UFormField :label="$t('storefront.checkout.address.floor')">
                <UInput
                  v-model="checkoutStore.floor"
                  size="xl"
                />
              </UFormField>
            </div>

            <UFormField :label="$t('storefront.checkout.address.note')">
              <UTextarea
                v-model="checkoutStore.addressNote"
                size="xl"
                class="w-full"
                :placeholder="$t('storefront.checkout.address.note-placeholder')"
              />
            </UFormField>
          </div>

          <div v-if="checkoutStore?.deliveryMethod === 'pickup'" class="flex flex-col gap-2">
            <h3 class="text-lg md:text-xl font-medium">
              {{ $t('storefront.checkout.select-address') }}
            </h3>

            <USelect
              v-model="checkoutStore.kitchenId"
              :items="channelStore.kitchens.map(k => ({ label: k.address ?? '', value: k.id }))"
              :placeholder="$t('common.select')"
              size="xl"
              icon="i-lucide-map-pin"
              class="w-full"
            />
          </div>

          <!-- <div class="flex flex-col gap-2">
            <h3 class="text-lg md:text-xl font-medium">
              {{ $t('storefront.checkout.time-title') }}
            </h3>

            <USelect
              v-model="remainingCheckout.time"
              :items="[
                { label: $t('storefront.checkout.as-soon-as-possible'), value: 0 },
                ...channel.timeSlots,
              ]"
              size="xl"
              icon="food:clock"
              class="w-full"
            />
          </div> -->
        </div>

        <div class="p-3 md:p-6 bg-elevated/50 rounded-2xl flex flex-col gap-4">
          <h2 class="text-xl md:text-2xl font-medium">
            {{ $t('storefront.checkout.order-title') }}
          </h2>

          <CheckoutItem
            v-for="item in checkoutStore?.items"
            :key="item.id"
            :item="item"
          />

          <UFormField :label="$t('storefront.checkout.order-note')">
            <UTextarea
              v-model="checkoutStore.note"
              size="xl"
              class="w-full"
              :placeholder="$t('storefront.checkout.order-note-placeholder')"
            />
          </UFormField>
        </div>
      </div>

      <div class="col-span-full md:col-span-5 h-fit sticky top-20">
        <div class="mb-6 px-3 md:px-6 lg:pr-0 flex flex-col gap-5">
          <CartDeliveryMethodSwitch />

          <div class="space-y-2">
            <h3 class="text-lg md:text-xl font-medium">
              {{ $t('storefront.checkout.payment-title') }}
            </h3>

            <USelect
              v-model="checkoutStore.paymentMethodId"
              :items="availablePaymentMethods"
              :placeholder="$t('common.select')"
              size="xl"
              :icon="getIconByPaymentMethodType(selectedPaymentMethod?.type)"
              class="w-full"
            />

            <UFormField v-if="selectedPaymentMethod?.type === 'cash'" :label="$t('storefront.checkout.change-label')">
              <UInputNumber
                v-model="checkoutStore.cashAmount"
                size="xl"
                orientation="vertical"
                class="w-full"
                :min="0"
                :placeholder="channelStore.currencySign"
              />
            </UFormField>
          </div>

          <div class="space-y-2">
            <h3 class="text-lg md:text-xl font-medium">
              {{ $t('storefront.checkout.total-title') }}
            </h3>

            <div>
              <div class="flex flex-row justify-between">
                <div class="text-md">
                  {{ $t('storefront.checkout.cost.products') }}
                </div>
                <div class="text-lg tracking-tight">
                  {{ new Intl.NumberFormat(locale).format(checkoutStore.itemsPrice) }} <span class="text-sm">{{ channelStore.currencySign }}</span>
                </div>
              </div>

              <div v-if="checkoutStore?.deliveryMethod === 'delivery'" class="flex flex-row justify-between items-center">
                <div class="text-md">
                  {{ $t('storefront.checkout.cost.delivery') }}
                </div>
                <div class="text-lg tracking-tight">
                  {{ new Intl.NumberFormat(locale).format(checkoutStore.deliveryPrice) }} <span class="text-sm">{{ channelStore.currencySign }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <CheckoutInfoMessage
              v-if="checkoutStore?.deliveryMethod === 'delivery'"
              icon="info"
              :message="$t('storefront.checkout.info-shipping-price')"
            />
            <CheckoutInfoMessage
              v-if="!isValidCheckout && !isOkForData"
              icon="alert"
              :message="$t('storefront.checkout.warning-data')"
            />
            <CheckoutInfoMessage
              v-if="!isValidCheckout && !isOkForAmount"
              icon="alert"
              :message="`${$t('storefront.minimum-order-value')}: ${channelStore.selectedKitchen?.minAmountForDelivery} ${channelStore.currencySign}`"
            />
          </div>

          <div class="flex flex-row flex-nowrap gap-4 items-center">
            <UButton
              size="xl"
              variant="gradient"
              class="grow w-full justify-center"
              :loading="isLoading"
              :disabled="!isValidCheckout"
              :label="$t('storefront.checkout.create-order')"
              @click="setCheckoutAsCreated"
            />

            <div class="font-medium text-right text-2xl min-w-[5rem] tracking-tight">
              {{ new Intl.NumberFormat(locale).format(checkoutStore.totalPrice) }} <span class="text-base">{{ channelStore.currencySign }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <template v-else>
    <div class="text-center pt-16 pb-32">
      <h1 class="pt-8 mb-4 md:mb-8 text-3xl md:text-4xl font-medium text-center">
        {{ $t('storefront.cart.empty-label') }}
      </h1>

      <UButton
        to="/"
        size="xl"
        variant="gradient"
        :label="$t('common.to-home')"
      />
    </div>
  </template>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'checkout',
})

const { locale } = useI18n()

const channelStore = useChannelStore()
const checkoutStore = useCheckoutStore()

// await channel.updateTimeSlots()

const isLoading = ref(false)

const isOkForData = computed(() => !!checkoutStore.name && !!checkoutStore.phone && !!checkoutStore.paymentMethodId && (checkoutStore.deliveryMethod === 'delivery' ? !!checkoutStore.street : true) && (checkoutStore.deliveryMethod === 'pickup' ? !!checkoutStore.kitchenId : true))
const isOkForAmount = computed<boolean>(() => checkoutStore.deliveryMethod === 'delivery' && channelStore.selectedKitchen?.minAmountForDelivery ? channelStore.selectedKitchen.minAmountForDelivery <= checkoutStore.totalPrice : true)
const isValidCheckout = computed(() => isOkForAmount.value && isOkForData.value)

const availablePaymentMethods = computed(() => channelStore.selectedKitchen?.paymentMethods.map((m) => ({ label: m.name, value: m.id, icon: getIconByPaymentMethodType(m.type) })) ?? [])
const selectedPaymentMethod = computed(() => channelStore.selectedKitchen?.paymentMethods.find((m) => m.id === checkoutStore.paymentMethodId))

async function setCheckoutAsCreated() {
  isLoading.value = true

  const finishedCheckout = await checkoutStore.change({
    phone: checkoutStore.phone,
    name: checkoutStore.name,
    kitchenId: checkoutStore.kitchenId ?? undefined,
    street: checkoutStore.street,
    flat: checkoutStore.flat,
    intercom: checkoutStore.intercom,
    entrance: checkoutStore.entrance,
    floor: checkoutStore.floor,
    addressNote: checkoutStore.addressNote,
    note: checkoutStore.note,
    // time: remainingCheckout.value.time,
    paymentMethodId: checkoutStore.paymentMethodId,
    cashAmount: selectedPaymentMethod.value?.type === 'cash' ? checkoutStore.cashAmount : undefined,
  })

  await navigateTo(`/finish?id=${finishedCheckout?.id}`)

  isLoading.value = false
}

function getIconByPaymentMethodType(type?: 'cash' | 'card' | 'online') {
  if (type === 'cash') {
    return 'i-lucide-banknote'
  }
  if (type === 'online') {
    return 'i-lucide-globe-lock'
  }
  return 'i-lucide-credit-card'
}
</script>
