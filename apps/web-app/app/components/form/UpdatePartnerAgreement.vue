<template>
  <UForm
    :validate="createValidator(updatePartnerAgreementSchema)"
    :state="state"
    class="flex flex-col gap-3"
    @submit="onSubmit"
  >
    <UFormField label="Роялти, %" name="royalty">
      <UInputNumber
        v-model="state.royalty"
        orientation="vertical"
        :step="0.1"
        size="xl"
        class="w-full items-center justify-center"
      />
    </UFormField>

    <UFormField label="Мин. роялти, руб" name="minRoyaltyPerMonth">
      <UInputNumber
        v-model="state.minRoyaltyPerMonth"
        orientation="vertical"
        size="xl"
        class="w-full items-center justify-center"
      />
    </UFormField>

    <UFormField label="Маркетинговый сбор, %" name="marketingFee">
      <UInputNumber
        v-model="state.marketingFee"
        orientation="vertical"
        size="xl"
        class="w-full items-center justify-center"
      />
    </UFormField>

    <UFormField label="Мин. маркетинговый сбор, руб" name="minMarketingFeePerMonth">
      <UInputNumber
        v-model="state.minMarketingFeePerMonth"
        orientation="vertical"
        size="xl"
        class="w-full items-center justify-center"
      />
    </UFormField>

    <UFormField label="Паушальный взнос, руб" name="lumpSumPayment">
      <UInputNumber
        v-model="state.lumpSumPayment"
        orientation="vertical"
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
      :label="$t('common.update')"
    />
  </UForm>
</template>

<script setup lang="ts">
import type { UpdatePartnerAgreement } from '#shared/services/partner'
import type { FormSubmitEvent } from '@nuxt/ui'
import { updatePartnerAgreementSchema } from '#shared/services/partner'

const { agreementId } = defineProps<{
  agreementId: string
}>()

const emit = defineEmits(['success', 'submitted'])

const { t } = useI18n()
const actionToast = useActionToast()

const partnerStore = usePartnerStore()
const partner = computed(() => partnerStore.partners.find((partner) => partner.activeAgreementId === agreementId))
const agreement = computed(() => partner.value?.activeAgreement)

const state = ref<Partial<UpdatePartnerAgreement>>({
  royalty: agreement.value?.royalty,
  minRoyaltyPerMonth: agreement.value?.minRoyaltyPerMonth,
  marketingFee: agreement.value?.marketingFee,
  minMarketingFeePerMonth: agreement.value?.minMarketingFeePerMonth,
  lumpSumPayment: agreement.value?.lumpSumPayment,
  comment: agreement.value?.comment ?? undefined,
})

async function onSubmit(event: FormSubmitEvent<UpdatePartnerAgreement>) {
  const toastId = actionToast.start()
  emit('submitted')

  try {
    await $fetch(`/api/partner/agreement/id/${agreementId}`, {
      method: 'PATCH',
      body: event.data,
    })

    await partnerStore.update()

    actionToast.success(toastId, t('toast.partner-agreement-updated'))
    emit('success')
  } catch (error) {
    console.error(error)
    actionToast.error(toastId)
  }
}
</script>
