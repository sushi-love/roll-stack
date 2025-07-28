<template>
  <UForm
    :validate="createValidator(uploadFileSchema)"
    :state="state"
    class="flex flex-col gap-3"
    @submit="onSubmit"
  >
    <UFormField
      label="Тип отчета"
      name="type"
      required
    >
      <USelectMenu
        v-model="selectedType"
        :items="availableTypes"
        :placeholder="$t('common.select')"
        size="xl"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Файл"
      name="file"
      description="Не более 20 МБ"
      required
    >
      <UFileUpload
        v-model="state.file"
        color="neutral"
        highlight
        label="Перетащите свой файл сюда"
        description="XLSX"
        class="min-h-28"
      />

      <template #hint>
        <UButton
          to="/docs/examples/iiko-daily-revenue.jpg"
          target="_blank"
          variant="subtle"
          color="neutral"
          size="sm"
          icon="i-lucide-file-text"
        >
          Пример файла-отчета
        </UButton>
      </template>
    </UFormField>

    <UButton
      type="submit"
      variant="solid"
      color="secondary"
      size="xl"
      block
      class="mt-3"
      :label="$t('common.upload')"
    />
  </UForm>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { UploadFile } from '~~/shared/services/file'
import { uploadFileSchema } from '~~/shared/services/file'

const emit = defineEmits(['success', 'submitted'])

const { t } = useI18n()
const actionToast = useActionToast()

const postStore = usePostStore()

const state = ref<Partial<UploadFile>>({
  file: undefined,
})

const availableTypes = [
  { label: 'Выручка магазинов из iiko за 1 день', value: 'iiko-daily' },
]
const selectedType = ref<typeof availableTypes[0]>()

async function onSubmit(event: FormSubmitEvent<UploadFile>) {
  const toastId = actionToast.start()
  emit('submitted')

  try {
    const formData = new FormData()
    formData.append('file', event.data.file)

    const data = await $fetch(`/api/kitchen/revenue/${selectedType.value?.value}`, {
      method: 'POST',
      body: formData,
    })

    await postStore.update()

    const errors = data.result.errors.length ? `Ошибки: ${data.result.errors}` : ''

    actionToast.success(
      toastId,
      t('toast.file-loaded'),
      `Было добавлено ${data.result.rowsUpdated} ${pluralizationRu(data.result.rowsUpdated, ['запись', 'записи', 'записей'])}. ${errors}`)
    emit('success')
  } catch (error) {
    console.error(error)
    actionToast.error(toastId)
  }
}
</script>
