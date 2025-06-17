<template>
  <UModal :title="checkoutStore?.deliveryMethod === 'delivery' ? $t('storefront.cart.delivery-details') : $t('storefront.cart.pickup-details')" :ui="{ footer: 'justify-end' }">
    <template #body>
      <div class="font-sans whitespace-pre-wrap">
        {{ conditions }}
      </div>

      <div v-if="minAmountForDelivery && checkoutStore?.deliveryMethod === 'delivery'">
        <h3 class="mt-8 mb-2 text-xl font-semibold">
          {{ $t('common.more-information') }}
        </h3>

        <div class="flex flex-row justify-between">
          <div>{{ $t('storefront.minimum-order-value') }}</div>
          <div>
            {{ minAmountForDelivery }} <span class="text-sm">{{ menuStore.currencySign }}</span>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <UButton
        variant="gradient"
        size="xl"
        block
        @click="overlay.closeAll"
      >
        {{ $t('common.ok') }}
      </UButton>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const menuStore = useMenuStore()
const checkoutStore = useCheckoutStore()

const overlay = useOverlay()

const minAmountForDelivery = 850

const conditions = `Доставка осуществляется в течение 1-2 часов после оформления заказа.

Минимальная сумма заказа для бесплатной доставки составляет 1500 руб.

Стоимость доставки рассчитывается в зависимости от расстояния до пункта выдачи или адреса доставки и может составлять от 0 до 1000 руб.

Заказ может быть оплачен при получении наличными или картой.

В случае отмены заказа или изменения его условий доставка оплачивается в полном объеме.

Заведение оставляет за собой право отказать в доставке в случае большого количества заказов или технических проблем.
`
</script>
