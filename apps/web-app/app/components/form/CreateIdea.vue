<template>
  <UForm
    :schema="createIdeaSchema"
    :state="state"
    class="flex flex-col gap-3"
    @submit="onSubmit"
  >
    <UFormField :label="$t('app.create.idea.label')" name="description">
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
      color="primary"
      size="xl"
      block
      class="mt-3"
    >
      {{ $t('common.add') }}
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
import type { CreateIdea } from '#shared/services/idea'
import type { FormSubmitEvent } from '@nuxt/ui'
import { createIdeaSchema } from '#shared/services/idea'

const emit = defineEmits(['success', 'submitted'])

const { t } = useI18n()
const actionToast = useActionToast()
// const channel = useChannelStore()

const state = ref<Partial<CreateIdea>>({
  text: undefined,
})

async function onSubmit(event: FormSubmitEvent<CreateIdea>) {
  actionToast.start()
  emit('submitted')

  try {
    await $fetch('/api/idea', {
      method: 'POST',
      body: event.data,
    })

    // await channel.update()
    actionToast.success(t('toast.product-created'))
    emit('success')
  } catch (error) {
    console.error(error)
    actionToast.error()
  }
}
</script>
