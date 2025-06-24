<template>
  <div class="flex flex-col w-full min-w-72 h-full shrink-0">
    <Loader v-if="!checkoutStore.id" />

    <div v-else class="flex flex-col w-full h-full shrink-0">
      <div class="flex flex-col gap-4 flex-1 overflow-y-auto px-4 py-2">
        <div class="flex flex-row justify-between items-center">
          <h3 class="text-2xl font-medium">
            {{ $t('storefront.cart.title') }}
          </h3>

          <UButton
            icon="i-lucide-x"
            variant="soft"
            class="xl:hidden"
            @click="isCartDrawerOpened = !isCartDrawerOpened"
          />
        </div>

        <CartDeliveryMethodSwitch />

        <div>
          <CartEmpty v-if="checkoutStore.isEmpty" class="mt-12" />
          <template v-else>
            <CartItem
              v-for="item in checkoutStore.items"
              :key="item.id"
              :item-id="item.id"
            />
          </template>
        </div>
      </div>

      <div class="shrink-0 flex flex-col gap-y-2.5 px-4 py-3.5 rounded-lg xl:bg-elevated/50">
        <div class="flex flex-col gap-y-0">
          <UButton
            variant="link"
            color="neutral"
            icon="i-lucide-info"
            class="px-0"
            :label="$t('storefront.cart.conditions')"
            @click="modalDeliveryInfo.open()"
          />

          <UButton
            v-if="channelStore.selectedKitchen"
            variant="link"
            color="neutral"
            icon="i-lucide-map-pinned"
            class="px-0"
            :label="channelStore.selectedKitchen.address ?? ''"
          />

          <UButton
            v-if="checkoutStore.deliveryPrice > 0"
            variant="link"
            color="neutral"
            icon="i-lucide-bike"
            class="px-0"
          >
            <div class="w-full flex flex-row justify-between">
              <p>{{ $t('storefront.delivery-price') }}</p>
              <p class="text-sm">
                {{ checkoutStore.deliveryPrice }} <span>{{ channelStore.currencySign }}</span>
              </p>
            </div>
          </UButton>
        </div>

        <UButton
          v-if="!checkoutStore.isEmpty"
          to="/checkout"
          variant="gradient"
          size="xl"
          block
          class="justify-between"
        >
          <p class="font-semibold">
            {{ $t('storefront.cart.next-label') }}
          </p>
          <p class="text-lg tracking-tight">
            {{ new Intl.NumberFormat(locale).format(checkoutStore.totalPrice) }} <span class="text-base">{{ channelStore.currencySign }}</span>
          </p>
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalDeliveryInfo } from '#components'

const { locale } = useI18n()
const { isCartDrawerOpened } = useApp()

const channelStore = useChannelStore()
const checkoutStore = useCheckoutStore()

const overlay = useOverlay()
const modalDeliveryInfo = overlay.create(ModalDeliveryInfo)
</script>
