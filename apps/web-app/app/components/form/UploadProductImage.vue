<template>
  <UForm
    :validate="createValidator(uploadMediaSchema)"
    :state="state"
    class="flex flex-col gap-3"
    @submit="onSubmit"
  >
    <UFormField :label="$t('common.photo')" name="file">
      <UInput
        ref="fileRef"
        type="file"
        accept="image/*"
        size="xl"
        class="w-full items-center justify-center"
        @change="onFileChange"
      />
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
import type { UploadMedia } from '~~/shared/services/media'
import { uploadMediaSchema } from '~~/shared/services/media'

const { productId } = defineProps<{
  productId: string
}>()

const emit = defineEmits(['success', 'submitted'])

const { t } = useI18n()
const actionToast = useActionToast()

const productStore = useProductStore()

const state = ref<Partial<UploadMedia>>({
  file: undefined,
})

const fileRef = ref<HTMLInputElement>()

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files?.length) {
    return
  }

  state.value.file = input.files[0]
}

async function onSubmit(event: FormSubmitEvent<UploadMedia>) {
  const toastId = actionToast.start()
  emit('submitted')

  try {
    const formData = new FormData()
    formData.append('file', event.data.file)

    await $fetch(`/api/product/id/${productId}/image`, {
      method: 'POST',
      body: formData,
    })

    await productStore.update()

    actionToast.success(toastId, t('toast.photo-loaded'))
    emit('success')
  } catch (error) {
    console.error(error)
    actionToast.error(toastId)
  }
}
</script>
