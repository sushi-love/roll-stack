import { type Checkout, repository } from '@sushi-atrium/database'

const MAX_LINES_PER_CHECKOUT = 20

const isDeliveryAvailable = true

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    if (!body.productVariantId) {
      throw createError({
        statusCode: 400,
        message: 'Missing data',
      })
    }

    // Guard: If channel is not active or pickup/delivery is not available
    // if (!channel?.isActive || (!channel?.isPickupAvailable && !channel?.isDeliveryAvailable)) {
    //   throw createError({
    //     statusCode: 400,
    //     message: 'Channel is not active',
    //   })
    // }

    // Check if checkout exists
    let checkoutId = ''

    const { secure } = await getUserSession(event)
    if (!secure?.checkoutId) {
      // Create new checkout
      const deliveryMethod: Checkout['deliveryMethod'] = isDeliveryAvailable ? 'delivery' : 'pickup'

      const createdCheckout = await repository.checkout.create({
        status: 'forming',
        deliveryMethod,
        name: '',
        phone: '',
        // street: '',
        // flat: null,
        // intercom: null,
        // entrance: null,
        // floor: null,
        // addressNote: null,
        itemsPrice: 0,
        deliveryPrice: 0,
        totalPrice: 0,
        // paymentMethodId: '',
        // discount: 0,
        // note: null,
        // change: null,
        // time: '',
        // timeType: 'ASAP',
        // warehouseId: null,
      })
      if (!createdCheckout?.id) {
        throw createError({
          statusCode: 400,
          message: 'Failed to create checkout',
        })
      }

      // Update user session
      await setUserSession(event, {
        secure: {
          checkoutId: createdCheckout.id,
        },
      })

      checkoutId = createdCheckout.id
    } else {
      checkoutId = secure.checkoutId
    }

    const checkoutInDB = await repository.checkout.find(checkoutId)
    if (!checkoutInDB?.id) {
      throw createError({
        statusCode: 404,
        message: 'No checkout',
      })
    }

    // Add +1 or create new item
    const item = checkoutInDB.items.find((line) => line.productVariantId === body.productVariantId)
    if (!item) {
      // Check limit
      if (checkoutInDB.items?.length >= MAX_LINES_PER_CHECKOUT) {
        throw createError({
          statusCode: 400,
          message: 'Limit reached',
        })
      }

      // Create new
      await repository.checkout.createItem({
        checkoutId,
        productVariantId: body.productVariantId,
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0,
        // undiscountedUnitPrice: 0,
        // undiscountedTotalPrice: 0,
        // isGift: false,
      })
    } else {
      // Add +1
      await repository.checkout.updateItem(item.id, {
        quantity: item.quantity + 1,
      })
    }

    await repository.checkout.recalculate(checkoutId)

    return { ok: true }
  } catch (error) {
    throw errorResolver(error)
  }
})
