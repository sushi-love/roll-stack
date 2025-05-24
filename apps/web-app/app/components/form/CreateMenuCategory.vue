<template>
  <UForm
    :validate="createValidator(createMenuCategorySchema)"
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
import type { CreateMenuCategory } from '#shared/services/menu'
import type { FormSubmitEvent } from '@nuxt/ui'
import { UInput } from '#components'
import { createMenuCategorySchema } from '#shared/services/menu'

const { menuId } = defineProps<{ menuId: string }>()
const emit = defineEmits(['success', 'submitted'])

const { t } = useI18n()
const actionToast = useActionToast()

const menuStore = useMenuStore()

const state = ref<Partial<CreateMenuCategory>>({
  name: undefined,
  menuId,
})

async function onSubmit(event: FormSubmitEvent<CreateMenuCategory>) {
  const toastId = actionToast.start()
  emit('submitted')

  try {
    await $fetch('/api/menu/category', {
      method: 'POST',
      body: event.data,
    })

    await menuStore.update()

    actionToast.success(toastId, t('toast.menu-category-created'))
    emit('success')
  } catch (error) {
    console.error(error)
    actionToast.error(toastId)
  }
}
</script>
