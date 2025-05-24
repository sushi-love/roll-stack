<template>
  <UForm
    :validate="createValidator(updateMenuCategorySchema)"
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

    <UFormField :label="$t('common.slug')" name="slug">
      <UInput
        v-model="state.slug"
        size="xl"
        class="w-full items-center justify-center"
      />
    </UFormField>

    <UFormField :label="$t('common.icon')" name="icon">
      <USelectMenu
        v-model="iconState"
        :icon="iconState.icon"
        :items="getCategoryIconsForSelect()"
        :placeholder="$t('common.select')"
        size="xl"
        class="w-full"
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

      <UButton
        variant="soft"
        color="error"
        size="xl"
        icon="i-lucide-trash-2"
        class="aspect-square justify-center"
        @click="onDelete"
      />
    </div>
  </UForm>
</template>

<script setup lang="ts">
import type { UpdateMenuCategory } from '#shared/services/menu'
import type { FormSubmitEvent } from '@nuxt/ui'
import { updateMenuCategorySchema } from '#shared/services/menu'

const { categoryId, redirectTo } = defineProps<{
  categoryId: string
  redirectTo: string
}>()

const emit = defineEmits(['success', 'submitted'])

const { t } = useI18n()
const router = useRouter()
const actionToast = useActionToast()

const menuStore = useMenuStore()
const category = computed(() => menuStore.categories.find((category) => category.id === categoryId))

const iconState = ref({
  label: getCategoryIconsForSelect().find((icon) => icon.value === category.value?.icon)?.label ?? '',
  value: category.value?.icon ?? '',
  icon: category.value?.icon ?? '',
})

const state = ref<Partial<UpdateMenuCategory>>({
  name: category.value?.name,
  slug: category.value?.slug,
  icon: category.value?.icon ?? '',
})

watch(iconState, () => {
  state.value.icon = iconState.value.value
})

async function onSubmit(event: FormSubmitEvent<UpdateMenuCategory>) {
  const toastId = actionToast.start()
  emit('submitted')

  try {
    await $fetch(`/api/menu/category/id/${categoryId}`, {
      method: 'PATCH',
      body: event.data,
    })

    await menuStore.update()

    actionToast.success(toastId, t('toast.category-updated'))
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
    await $fetch(`/api/category/id/${categoryId}`, {
      method: 'DELETE',
    })

    await menuStore.update()

    actionToast.success(toastId, t('toast.category-deleted'))
    emit('success')

    router.push(redirectTo)
  } catch (error) {
    console.error(error)
    actionToast.error(toastId)
  }
}
</script>
