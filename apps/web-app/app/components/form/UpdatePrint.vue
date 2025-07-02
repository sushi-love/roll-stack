<template>
  <UForm
    :validate="createValidator(updatePrintSchema)"
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
        autoresize
      />
    </UFormField>

    <UFormField label="Важно" name="importantInfo">
      <UTextarea
        v-model="state.importantInfo"
        size="xl"
        class="w-full items-center justify-center"
        autoresize
      />
    </UFormField>

    <UFormField label="Техническая информация" name="technicalInfo">
      <UTextarea
        v-model="state.technicalInfo"
        size="xl"
        class="w-full items-center justify-center"
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

    <div class="mt-3 flex flex-row gap-3">
      <UButton
        type="submit"
        variant="solid"
        color="secondary"
        size="xl"
        block
        :label="$t('common.update')"
      />

      <UTooltip :text="$t('app.delete.print.button')">
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
import type { UpdatePrint } from '~~/shared/services/print'
import { updatePrintSchema } from '~~/shared/services/print'

const { printId, redirectTo } = defineProps<{
  printId: string
  redirectTo: string
}>()

const emit = defineEmits(['success', 'submitted'])

const { t } = useI18n()
const router = useRouter()
const actionToast = useActionToast()

const printStore = usePrintStore()
const print = computed(() => printStore.prints.find((p) => p.id === printId))

const state = ref<Partial<UpdatePrint>>({
  name: print.value?.name,
  description: print.value?.description ?? undefined,
  importantInfo: print.value?.importantInfo ?? undefined,
  technicalInfo: print.value?.technicalInfo ?? undefined,
  regularAmount: print.value?.regularAmount ?? 0,
})

async function onSubmit(event: FormSubmitEvent<UpdatePrint>) {
  const toastId = actionToast.start()
  emit('submitted')

  try {
    await $fetch(`/api/print/id/${printId}`, {
      method: 'PATCH',
      body: event.data,
    })

    await printStore.update()

    actionToast.success(toastId, t('toast.print-updated'))
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
    await $fetch(`/api/print/id/${printId}`, {
      method: 'DELETE',
    })

    await printStore.update()

    actionToast.success(toastId, t('toast.print-deleted'))
    emit('success')

    router.push(redirectTo)
  } catch (error) {
    console.error(error)
    actionToast.error(toastId)
  }
}
</script>
