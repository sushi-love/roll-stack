<template>
  <UForm
    :validate="createValidator(updateProductVariantSchema)"
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

    <UFormField label="Теги" name="tags">
      <USelectMenu
        v-model="selectedTags"
        :items="availableTags"
        :placeholder="$t('common.select')"
        multiple
        size="xl"
        class="w-full"
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
            :ui="{ trailing: 'pe-2' }"
          >
            <template v-if="state.calories != null && state.calories >= 0" #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="md"
                icon="i-lucide-circle-x"
                @click="state.calories = null"
              />
            </template>
          </UInput>
        </UFormField>

        <UFormField :label="$t('common.nutrition.protein')" name="protein">
          <UInput
            v-model="state.protein"
            type="number"
            :step="0.1"
            size="xl"
            class="w-full items-center justify-center"
            :ui="{ trailing: 'pe-2' }"
          >
            <template v-if="state.protein != null && state.protein >= 0" #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="md"
                icon="i-lucide-circle-x"
                @click="state.protein = null"
              />
            </template>
          </UInput>
        </UFormField>

        <UFormField :label="$t('common.nutrition.fat')" name="fat">
          <UInput
            v-model="state.fat"
            type="number"
            :step="0.1"
            size="xl"
            class="w-full items-center justify-center"
            :ui="{ trailing: 'pe-2' }"
          >
            <template v-if="state.fat != null && state.fat >= 0" #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="md"
                icon="i-lucide-circle-x"
                @click="state.fat = null"
              />
            </template>
          </UInput>
        </UFormField>

        <UFormField :label="$t('common.nutrition.carbohydrate')" name="carbohydrate">
          <UInput
            v-model="state.carbohydrate"
            type="number"
            :step="0.1"
            size="xl"
            class="w-full items-center justify-center"
            :ui="{ trailing: 'pe-2' }"
          >
            <template v-if="state.carbohydrate != null && state.carbohydrate >= 0" #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="md"
                icon="i-lucide-circle-x"
                @click="state.carbohydrate = null"
              />
            </template>
          </UInput>
        </UFormField>
      </div>
    </div>

    <div class="mt-3 flex flex-row gap-3">
      <UButton
        type="submit"
        variant="solid"
        color="secondary"
        size="xl"
        block
        :label="$t('common.update')"
      />

      <UTooltip :text="$t('app.delete.product-variant.button')">
        <UButton
          variant="soft"
          color="error"
          size="xl"
          icon="i-lucide-trash-2"
          class="aspect-square justify-center"
          @click="onDelete"
        />
      </UTooltip>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { UpdateProductVariant } from '~~/shared/services/product'
import { updateProductVariantSchema } from '~~/shared/services/product'
import { getLocalizedWeightUnitsForSelect } from '~/utils/helpers'

const { productVariantId } = defineProps<{
  productVariantId: string
}>()

const emit = defineEmits(['success', 'submitted'])

const { t } = useI18n()
const actionToast = useActionToast()

const productStore = useProductStore()
const menuStore = useMenuStore()

const allVariants = computed(() => productStore.products.flatMap((product) => product.variants))
const productVariant = computed(() => allVariants.value.find((variant) => variant.id === productVariantId))

const availableTags = computed(() => productStore.variantTags.map((t) => ({ label: t.name, value: t.id })))
const selectedTags = ref<{ label: string, value: string }[]>(productVariant.value?.tags.map((t) => ({ label: t.name, value: t.id })) ?? [])

const state = ref<Partial<UpdateProductVariant>>({
  name: productVariant.value?.name,
  weightUnit: productVariant.value?.weightUnit,
  weightValue: productVariant.value?.weightValue,
  gross: productVariant.value?.gross,
  net: productVariant.value?.net ?? undefined,
  sku: productVariant.value?.sku ?? undefined,
  calories: productVariant.value?.calories ?? undefined,
  carbohydrate: productVariant.value?.carbohydrate ?? undefined,
  protein: productVariant.value?.protein ?? undefined,
  fat: productVariant.value?.fat ?? undefined,
  tagsId: selectedTags.value.map((t) => t.value),
})

watch(selectedTags, () => {
  state.value.tagsId = selectedTags.value.map((t) => t.value)
})

async function onSubmit(event: FormSubmitEvent<UpdateProductVariant>) {
  const toastId = actionToast.start()
  emit('submitted')

  try {
    await $fetch(`/api/product/variant/id/${productVariantId}`, {
      method: 'PATCH',
      body: event.data,
    })

    await productStore.update()
    await menuStore.update()

    actionToast.success(toastId, t('toast.variant-updated'))
    emit('success')
  } catch (error) {
    console.error(error)
    actionToast.error(toastId)
  }
}

async function onDelete() {
  const toastId = actionToast.start()
  emit('submitted')

  try {
    await $fetch(`/api/product/variant/id/${productVariantId}`, {
      method: 'DELETE',
    })

    await productStore.update()
    await menuStore.update()

    actionToast.success(toastId, t('toast.variant-deleted'))
    emit('success')
  } catch (error) {
    console.error(error)
    actionToast.error(toastId)
  }
}
</script>
