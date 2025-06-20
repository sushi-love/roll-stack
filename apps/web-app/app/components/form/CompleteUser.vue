<template>
  <UForm
    ref="form"
    :validate="createValidator(completeUserSchema)"
    :state="state"
    class="flex flex-col gap-3"
    @submit="onSubmit"
  >
    <UFormField :label="$t('common.name')" name="name">
      <UInput
        v-model="state.name"
        size="xl"
        class="w-full items-center justify-center"
      />
    </UFormField>

    <UFormField :label="$t('common.surname')" name="surname">
      <UInput
        v-model="state.surname"
        size="xl"
        class="w-full items-center justify-center"
      />
    </UFormField>

    <UFormField label="Телефон" name="phone">
      <UInput
        v-model="state.phone"
        size="xl"
        class="w-full items-center justify-center"
      />
    </UFormField>

    <UFormField :label="$t('common.email')" name="email">
      <UInput
        v-model="state.email"
        size="xl"
        class="w-full items-center justify-center"
      />
    </UFormField>

    <UFormField :label="$t('common.caption')" name="caption">
      <UInput
        v-model="state.caption"
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
      label="Готово!"
    />
  </UForm>
</template>

<script setup lang="ts">
import type { CompleteUser } from '#shared/services/user'
import type { FormSubmitEvent } from '@nuxt/ui'
import { completeUserSchema } from '#shared/services/user'

const { userId } = defineProps<{ userId: string }>()

const emit = defineEmits(['success', 'submitted'])

const { t } = useI18n()
const actionToast = useActionToast()

const state = ref<Partial<CompleteUser>>({
  name: undefined,
  surname: undefined,
  email: undefined,
  phone: undefined,
  caption: undefined,
})

const form = useTemplateRef('form')
const isFormValid = ref(false)

watch(
  () => form.value?.errors.length,
  () => {
    isFormValid.value
      = !form.value?.errors.length
        && !!state.value.name
        && !!state.value.surname
        && !!state.value.email
        && !!state.value.phone
  },
)

async function onSubmit(event: FormSubmitEvent<CompleteUser>) {
  const toastId = actionToast.start()
  emit('submitted')

  try {
    await $fetch(`/api/user/id/${userId}/complete`, {
      method: 'POST',
      body: event.data,
    })

    actionToast.success(toastId, t('toast.user-updated'))
    emit('success')

    await navigateTo('/sign-in')
  } catch (error) {
    console.error(error)
    actionToast.error(toastId)
  }
}
</script>
