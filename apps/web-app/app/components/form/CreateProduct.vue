<template>
  <UForm
    :validate="createValidator(createProductSchema)"
    :state="state"
    class="flex flex-col gap-3"
    @submit="onSubmit"
  >
    <UFormField :label="$t('common.title')" name="name">
      <UInput
        v-model="state.name"
        size="xl"
        class="w-full items-center justify-center"
      />
    </UFormField>

    <UFormField :label="$t('common.description')" name="description">
      <UTextarea
        v-model="state.description"
        size="xl"
        class="w-full items-center justify-center"
      />
    </UFormField>

    <UButton
      type="submit"
      variant="solid"
      color="secondary"
      size="xl"
      block
      class="mt-3"
      :label="$t('common.create')"
    />
  </UForm>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { CreateProduct } from '~~/shared/services/product'
import { createProductSchema } from '~~/shared/services/product'

const emit = defineEmits(['success', 'submitted'])

const { t } = useI18n()
const actionToast = useActionToast()
const productStore = useProductStore()

const state = ref<Partial<CreateProduct>>({
  name: undefined,
  description: undefined,
})

async function onSubmit(event: FormSubmitEvent<CreateProduct>) {
  const toastId = actionToast.start()
  emit('submitted')

  try {
    await $fetch('/api/product', {
      method: 'POST',
      body: event.data,
    })

    await productStore.update()

    actionToast.success(toastId, t('toast.product-created'))
    emit('success')
  } catch (error) {
    console.error(error)
    actionToast.error(toastId)
  }
}
</script>
