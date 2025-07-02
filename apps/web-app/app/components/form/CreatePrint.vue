<template>
  <UForm
    :validate="createValidator(createPrintSchema)"
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
        :rows="2"
        autoresize
      />
    </UFormField>

    <UFormField label="Важно" name="importantInfo">
      <UTextarea
        v-model="state.importantInfo"
        size="xl"
        class="w-full items-center justify-center"
        :rows="2"
        autoresize
      />
    </UFormField>

    <UFormField label="Техническая информация" name="technicalInfo">
      <UTextarea
        v-model="state.technicalInfo"
        size="xl"
        class="w-full items-center justify-center"
        :rows="2"
        autoresize
      />
    </UFormField>

    <UFormField label="Обычный тираж" name="regularAmount">
      <UInput
        v-model="state.regularAmount"
        type="number"
        step="1"
        placeholder="0"
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
import type { CreatePrint } from '~~/shared/services/print'
import { createPrintSchema } from '~~/shared/services/print'

const emit = defineEmits(['success', 'submitted'])

const { t } = useI18n()
const actionToast = useActionToast()
const printStore = usePrintStore()

const state = ref<Partial<CreatePrint>>({
  name: undefined,
  description: undefined,
  importantInfo: undefined,
  technicalInfo: undefined,
  regularAmount: 0,
})

async function onSubmit(event: FormSubmitEvent<CreatePrint>) {
  const toastId = actionToast.start()
  emit('submitted')

  try {
    await $fetch('/api/print', {
      method: 'POST',
      body: event.data,
    })

    await printStore.update()

    actionToast.success(toastId, t('toast.print-created'))
    emit('success')
  } catch (error) {
    console.error(error)
    actionToast.error(toastId)
  }
}
</script>
