import type { Checkout, CheckoutItem, Kitchen, PaymentMethod, Product, ProductVariant } from '@roll-stack/database'

type CheckoutWithData = Checkout & {
  items: (CheckoutItem & {
    productVariant: ProductVariant & {
      product: Product
    }
  })[]
}

export const useCheckoutStore = defineStore('checkout', () => {
  const checkouts = ref<CheckoutWithData[]>([])
  const kitchens = ref<Kitchen[]>([])
  const paymentMethods = ref<PaymentMethod[]>([])

  async function update() {
    try {
      const data = await $fetch('/api/checkout/list')
      if (!data) {
        return
      }

      checkouts.value = data
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          // No
        }
        if (error.message.includes('404')) {
          // Not found
        }
      }
    }
  }

  async function updateKitchens() {
    try {
      const data = await $fetch('/api/kitchen/list')
      if (!data) {
        return
      }

      kitchens.value = data
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          // No
        }
        if (error.message.includes('404')) {
          // Not found
        }
      }
    }
  }

  async function updatePaymentMethods() {
    try {
      const data = await $fetch('/api/payment/method/list')
      if (!data) {
        return
      }

      paymentMethods.value = data
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          // No
        }
        if (error.message.includes('404')) {
          // Not found
        }
      }
    }
  }

  return {
    checkouts,
    kitchens,
    paymentMethods,

    update,
    updateKitchens,
    updatePaymentMethods,
  }
})
