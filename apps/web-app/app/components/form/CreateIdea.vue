<template>
  <UForm
    ref="form"
    :validate="createValidator(createIdeaSchema)"
    :state="state"
    class="flex flex-col gap-3"
    @submit="onSubmit"
  >
    <UFormField :label="$t('app.create.idea.label')" name="text">
      <UTextarea
        v-model="state.text"
        :placeholder="$t('app.create.idea.description')"
        size="xl"
        class="w-full items-center justify-center"
      />
    </UFormField>

    <UButton
      type="submit"
      variant="solid"
      color="secondary"
      :disabled="!isFormValid"
      size="xl"
      block
      class="mt-3"
      :label="$t('common.add')"
    />
  </UForm>
</template>

<script setup lang="ts">
import type { CreateIdea } from '#shared/services/idea'
import type { FormSubmitEvent } from '@nuxt/ui'
import { createIdeaSchema } from '#shared/services/idea'

const emit = defineEmits(['success', 'submitted'])

const { t } = useI18n()
const actionToast = useActionToast()

const state = ref<Partial<CreateIdea>>({
  text: undefined,
})

const form = useTemplateRef('form')
const isFormValid = ref(false)

watch(
  () => form.value?.errors.length,
  () => {
    isFormValid.value
      = !form.value?.errors.length
        && !!state.value.text
  },
)

async function onSubmit(event: FormSubmitEvent<CreateIdea>) {
  const toastId = actionToast.start()
  emit('submitted')

  try {
    await $fetch('/api/idea', {
      method: 'POST',
      body: event.data,
    })

    // await channel.update()
    actionToast.success(toastId, t('toast.idea-created'))
    emit('success')
  } catch (error) {
    console.error(error)
    actionToast.error(toastId)
  }
}
</script>
