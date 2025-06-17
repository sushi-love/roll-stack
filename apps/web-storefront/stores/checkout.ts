import type { Checkout, CheckoutDraft, CheckoutItem, ProductVariant } from '@sushi-atrium/database'

type CheckoutItemWithProduct = CheckoutItem & { productVariant: ProductVariant }

export const useCheckoutStore = defineStore('checkout', () => {
  const id = ref<string | null>(null)
  const name = ref<string | null>(null)
  const phone = ref<string | null>(null)
  const status = ref<Checkout['status'] | undefined>()
  const itemsPrice = ref(0)
  const deliveryPrice = ref(0)
  const totalPrice = ref(0)
  const deliveryMethod = ref<Checkout['deliveryMethod'] | undefined>()
  const items = ref<CheckoutItemWithProduct[]>([])

  const isEmpty = computed(() => items.value.length === 0)

  async function update() {
    try {
      const data = await $fetch('/api/checkout', {
        lazy: true,
        server: true,
        cache: 'no-cache',
        getCachedData: undefined,
      })
      if (!data) {
        return
      }

      id.value = data.id
      name.value = data.name
      phone.value = data.phone
      status.value = data.status
      itemsPrice.value = data.itemsPrice
      deliveryPrice.value = data.deliveryPrice
      totalPrice.value = data.totalPrice
      deliveryMethod.value = data.deliveryMethod
      items.value = data.items
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
  async function add(productVariantId: string) {
    try {
      await $fetch(
        '/api/checkout/add',
        {
          method: 'POST',
          body: { productVariantId },
        },
      )

      await update()
    } catch (error) {
      console.error(error)
    }
  }
  async function change(checkout: Partial<CheckoutDraft>) {
    try {
      await $fetch(
        '/api/checkout',
        {
          method: 'PATCH',
          body: checkout,
        },
      )

      await update()
    } catch (error) {
      console.error(error)
    }
  }
  async function changeQuantity(itemId: string, method: 'increment' | 'decrement') {
    try {
      await $fetch(
        `/api/checkout/item/${itemId}`,
        {
          method: 'POST',
          body: { method },
        },
      )

      await update()
    } catch (error) {
      console.error(error)
    }
  }
  async function get(id: string) {
    return $fetch(`/api/checkout/id/${id}`)
  }

  return {
    id,
    name,
    phone,
    status,
    itemsPrice,
    deliveryPrice,
    totalPrice,
    deliveryMethod,
    items,

    isEmpty,

    update,
    add,
    change,
    changeQuantity,
    get,
  }
})
