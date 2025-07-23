<template>
  <UForm
    :validate="createValidator(createPartnerLegalEntitySchema)"
    :state="state"
    class="flex flex-col gap-3"
    @submit="onSubmit"
  >
    <UFormField
      :label="$t('common.title')"
      name="name"
      required
    >
      <UInput
        v-model="state.name"
        size="xl"
        placeholder="ИП ИВАНОВ ИВАН ИВАНОВИЧ"
        class="w-full items-center justify-center"
      />
    </UFormField>

    <UFormField
      label="ИНН"
      name="inn"
      required
    >
      <UInput
        v-model="state.inn"
        size="xl"
        class="w-full items-center justify-center"
      />
    </UFormField>

    <UFormField label="ОГРНИП" name="ogrnip">
      <UInput
        v-model="state.ogrnip"
        size="xl"
        class="w-full items-center justify-center"
      />
    </UFormField>

    <UFormField :label="$t('common.comment')" name="comment">
      <UInput
        v-model="state.comment"
        size="xl"
        placeholder="Для внутреннего использования"
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
import type { CreatePartnerLegalEntity } from '#shared/services/partner'
import type { FormSubmitEvent } from '@nuxt/ui'
import { createPartnerLegalEntitySchema } from '#shared/services/partner'

const { partnerId } = defineProps<{ partnerId: string }>()
const emit = defineEmits(['success', 'submitted'])

const { t } = useI18n()
const actionToast = useActionToast()

const partnerStore = usePartnerStore()

const state = ref<Partial<CreatePartnerLegalEntity>>({
  inn: undefined,
  ogrnip: undefined,
  name: undefined,
  comment: undefined,
})

async function onSubmit(event: FormSubmitEvent<CreatePartnerLegalEntity>) {
  const toastId = actionToast.start()
  emit('submitted')

  try {
    await $fetch(`/api/partner/id/${partnerId}/legal`, {
      method: 'POST',
      body: event.data,
    })

    await partnerStore.update()

    actionToast.success(toastId, t('toast.partner-legal-entity-created'))
    emit('success')
  } catch (error) {
    console.error(error)
    actionToast.error(toastId)
  }
}
</script>
