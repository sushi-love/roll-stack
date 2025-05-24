<template>
  <USwitch
    :label="isAvailableForPurchase ? $t('app.product.available-for-purchase') : $t('app.product.not-available-for-purchase')"
    :default-value="isAvailableForPurchase"
    @change="onSubmit"
  />
</template>

<script setup lang="ts">
const { isAvailableForPurchase, productId } = defineProps<{
  isAvailableForPurchase: boolean
  productId: string
}>()

const emit = defineEmits(['success', 'submitted'])

const { t } = useI18n()
const actionToast = useActionToast()

const products = useProductStore()

async function onSubmit() {
  const toastId = actionToast.start()
  emit('submitted')

  try {
    await $fetch(`/api/product/id/${productId}`, {
      method: 'PATCH',
      body: {
        isAvailableForPurchase: !isAvailableForPurchase,
      },
    })

    await products.update()

    actionToast.success(toastId, t('toast.product-updated'))
    emit('success')
  } catch (error) {
    console.error(error)
    actionToast.error(toastId)
  }
}
</script>
