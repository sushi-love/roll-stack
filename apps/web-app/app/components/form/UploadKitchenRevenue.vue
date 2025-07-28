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
      label="Файлы"
      name="file"
      description="Не более 20 МБ"
      required
    >
      <UFileUpload
        v-model="state.files"
        color="neutral"
        highlight
        multiple
        label="Перетащите свои файлы сюда"
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
  files: [],
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
    for (const file of event.data.files) {
      formData.append('files', file)
    }

    const data = await $fetch(`/api/kitchen/revenue/${selectedType.value?.value}`, {
      method: 'POST',
      body: formData,
    })

    await postStore.update()

    const errorMessage = data.result.errors.length > 0 ? `Ошибки: ${data.result.errors.join(', ')}` : ''
    const description = `Было обновлено ${data.result.rowsUpdated} ${pluralizationRu(data.result.rowsUpdated, ['запись', 'записи', 'записей'])}. ${errorMessage}`

    actionToast.success(toastId, t('toast.files-handled'), description)
    emit('success')
  } catch (error) {
    console.error(error)
    actionToast.error(toastId)
  }
}
</script>
