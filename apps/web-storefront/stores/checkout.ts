import type { Checkout, CheckoutDraft, CheckoutItem, ProductVariant } from '@sushi-atrium/database'

type CheckoutItemWithProduct = CheckoutItem & { productVariant: ProductVariant }

export const useCheckoutStore = defineStore('checkout', () => {
  const id = ref<string | null>(null)
  const name = ref<string | null>(null)
  const phone = ref<string | null>(null)
  const status = ref<Checkout['status'] | undefined>()
  const deliveryMethod = ref<Checkout['deliveryMethod'] | undefined>()
  const note = ref<string | null>()
  const street = ref<string | null>()
  const flat = ref<string | null>()
  const intercom = ref<string | null>()
  const entrance = ref<string | null>()
  const floor = ref<string | null>()
  const addressNote = ref<string | null>()
  const cashAmount = ref<number | null>()
  const itemsPrice = ref(0)
  const deliveryPrice = ref(0)
  const totalPrice = ref(0)
  const kitchenId = ref<string | undefined>()
  const paymentMethodId = ref<string | undefined>()
  const items = ref<CheckoutItemWithProduct[]>([])

  const isValidPhone = ref<boolean>(false)
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
      deliveryMethod.value = data.deliveryMethod
      note.value = data.note
      street.value = data.street
      flat.value = data.flat
      intercom.value = data.intercom
      entrance.value = data.entrance
      floor.value = data.floor
      addressNote.value = data.addressNote
      cashAmount.value = data.cashAmount
      itemsPrice.value = data.itemsPrice
      deliveryPrice.value = data.deliveryPrice
      totalPrice.value = data.totalPrice
      kitchenId.value = data.kitchenId
      paymentMethodId.value = data.paymentMethodId ?? undefined
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
      const answer = await $fetch(
        '/api/checkout',
        {
          method: 'PATCH',
          body: checkout,
        },
      )

      await update()

      return answer.result
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

  watch(
    phone,
    () => {
      if (!phone.value) {
        return
      }
      if (phone.value?.length > 17) {
        return
      }

      // Check for country code
      if (phone.value?.length >= 2 && !phone.value.startsWith('+')) {
        // +7
        if (phone.value.startsWith('7')) {
          phone.value = `+${phone.value}`
        }

        // 8 to +7
        if (phone.value.startsWith('8')) {
          phone.value = `+7${phone.value.slice(1)}`
        }

        // 9 to +79
        if (phone.value.startsWith('9')) {
          phone.value = `+79${phone.value.slice(1)}`
        }
      }

      getPhoneNumberFormatter().input(phone.value)

      if (phone.value?.length >= 10) {
        phone.value = formatPhoneNumber(phone.value)
      }

      isValidPhone.value = checkPhoneNumberValidity(phone.value)
    },
  )

  return {
    id,
    name,
    phone,
    status,
    deliveryMethod,
    note,
    street,
    flat,
    intercom,
    entrance,
    floor,
    addressNote,
    cashAmount,
    itemsPrice,
    deliveryPrice,
    totalPrice,
    kitchenId,
    paymentMethodId,
    items,

    isValidPhone,
    isEmpty,

    update,
    add,
    change,
    changeQuantity,
    get,
  }
})
