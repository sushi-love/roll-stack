<template>
  <UForm
    :validate="createValidator(createProductVariantSchema)"
    :state="state"
    class="flex flex-col gap-3"
    @submit="onSubmit"
  >
    <UFormField :label="$t('common.title')" name="name">
      <UInput
        v-model="state.name"
        :placeholder="$t('app.product.variant-name-placeholder')"
        size="xl"
        class="w-full items-center justify-center"
      />
    </UFormField>

    <UFormField :label="`${$t('common.price')}, ${menuStore.currencySign}`" name="gross">
      <UInput
        v-model="state.gross"
        type="number"
        step="any"
        placeholder="0.00"
        size="xl"
        class="w-full items-center justify-center"
      />
    </UFormField>

    <div class="grid grid-cols-2 gap-2">
      <UFormField :label="$t('common.weight-or-volume')" name="weightValue">
        <UInput
          v-model="state.weightValue"
          type="number"
          step="any"
          size="xl"
          class="w-full items-center justify-center"
        />
      </UFormField>

      <UFormField :label="$t('common.measurement-unit')" name="weightUnit">
        <USelect
          v-model="state.weightUnit"
          :items="getLocalizedWeightUnitsForSelect()"
          :placeholder="$t('common.select')"
          size="xl"
          class="w-full"
        />
      </UFormField>
    </div>

    <UFormField :label="$t('common.sku')" name="sku">
      <UInput
        v-model="state.sku"
        :placeholder="$t('common.optional')"
        size="xl"
        class="w-full items-center justify-center"
      />
    </UFormField>

    <div class="pt-6">
      <h3 class="pb-1 font-medium text-highlighted text-lg">
        {{ $t('common.nutrition.value-title') }}
      </h3>

      <div class="grid grid-cols-2 gap-2">
        <UFormField :label="`${$t('common.nutrition.calories')}, ${$t('common.nutrition.kcal')}`" name="calories">
          <UInput
            v-model="state.calories"
            type="number"
            step="any"
            size="xl"
            class="w-full items-center justify-center"
          />
        </UFormField>

        <UFormField :label="$t('common.nutrition.protein')" name="protein">
          <UInput
            v-model="state.protein"
            type="number"
            step="any"
            size="xl"
            class="w-full items-center justify-center"
          />
        </UFormField>

        <UFormField :label="$t('common.nutrition.fat')" name="fat">
          <UInput
            v-model="state.fat"
            type="number"
            step="any"
            size="xl"
            class="w-full items-center justify-center"
          />
        </UFormField>

        <UFormField :label="$t('common.nutrition.carbohydrate')" name="carbohydrate">
          <UInput
            v-model="state.carbohydrate"
            type="number"
            step="any"
            size="xl"
            class="w-full items-center justify-center"
          />
        </UFormField>
      </div>
    </div>

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
import type { CreateProductVariant } from '~~/shared/services/product'
import { createProductVariantSchema } from '~~/shared/services/product'
import { getLocalizedWeightUnitsForSelect } from '~/utils/helpers'

const { productId } = defineProps<{
  productId: string
}>()

const emit = defineEmits(['success', 'submitted'])

const { t } = useI18n()
const actionToast = useActionToast()

const productStore = useProductStore()
const menuStore = useMenuStore()

const state = ref<Partial<CreateProductVariant>>({
  name: undefined,
  weightUnit: undefined,
  weightValue: undefined,
  gross: undefined,
  net: undefined,
  sku: undefined,
  calories: undefined,
  carbohydrate: undefined,
  protein: undefined,
  fat: undefined,
  productId,
})

async function onSubmit(event: FormSubmitEvent<CreateProductVariant>) {
  const toastId = actionToast.start()
  emit('submitted')

  try {
    await $fetch('/api/product/variant', {
      method: 'POST',
      body: event.data,
    })

    await productStore.update()

    actionToast.success(toastId, t('toast.variant-created'))
    emit('success')
  } catch (error) {
    console.error(error)
    actionToast.error(toastId)
  }
}
</script>
