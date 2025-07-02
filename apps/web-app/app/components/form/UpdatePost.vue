<template>
  <UForm
    :validate="createValidator(updatePostSchema)"
    :state="state"
    class="flex flex-col gap-3"
    @submit="onSubmit"
  >
    <UFormField
      label="Статус"
      name="status"
      required
    >
      <USelectMenu
        v-model="selectedStatus"
        :items="statuses"
        :placeholder="$t('common.select')"
        size="xl"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Где размещается"
      name="type"
      required
    >
      <USelectMenu
        v-model="selectedType"
        :items="types"
        :placeholder="$t('common.select')"
        size="xl"
        class="w-full"
      />
    </UFormField>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UPopover>
        <UFormField
          label="Дата публикации"
          name="date"
          required
        >
          <UInput
            :value="selectedDate ? df.format(selectedDate.toDate(getLocalTimeZone())) : ''"
            placeholder="Выберите дату"
            size="xl"
            class="w-full items-center justify-center cursor-pointer"
            :ui="{ trailing: 'pe-1.5' }"
          />
        </UFormField>

        <template #content>
          <UCalendar v-model="selectedDate" class="p-2" />
        </template>
      </UPopover>

      <UFormField
        label="Время публикации"
        name="time"
        required
      >
        <UInput
          v-model="selectedTime"
          type="time"
          size="xl"
          class="w-full items-center justify-center"
        />
      </UFormField>
    </div>

    <UFormField label="Комментарий" name="description">
      <UTextarea
        v-model="state.description"
        placeholder="Для внутреннего использования, не попадет в итоговый материал"
        :rows="3"
        autoresize
        size="xl"
        class="w-full items-center justify-center"
      />
    </UFormField>

    <UFormField label="Тело поста" name="content">
      <UTextarea
        v-model="state.content"
        placeholder="Тут должен быть текст с мотивацией, но он потерялся"
        :rows="6"
        autoresize
        size="xl"
        class="w-full items-center justify-center"
      />
    </UFormField>

    <UFormField label="Итоговая ссылка" name="url">
      <UInput
        v-model="state.url"
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

      <UTooltip text="Удалить пост">
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
import type { UpdatePost } from '#shared/services/post'
import type { CalendarDate } from '@internationalized/date'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Post } from '@sushi-atrium/database'
import { updatePostSchema } from '#shared/services/post'
import { DateFormatter, getLocalTimeZone, parseDate } from '@internationalized/date'

const { postId } = defineProps<{
  postId: string
}>()

const emit = defineEmits(['success', 'submitted'])

const { t } = useI18n()
const actionToast = useActionToast()

const postStore = usePostStore()
const post = computed(() => postStore.posts.find((post) => post.id === postId))

const types = [
  { label: t('common.social.vk'), value: 'vk' as const },
  { label: t('common.social.telegram'), value: 'telegram' as const },
]
const selectedType = ref<{ label: string, value: Post['type'] }>()

watch(selectedType, () => {
  if (!selectedType.value) {
    return
  }

  state.value.type = selectedType.value.value
})

const statuses = [
  { label: 'Черновик', value: 'draft' as const },
  { label: 'Запланировано', value: 'scheduled' as const },
  { label: 'Опубликовано', value: 'published' as const },
]
const selectedStatus = ref<{ label: string, value: Post['status'] }>()

watch(selectedStatus, () => {
  if (!selectedStatus.value) {
    return
  }

  state.value.status = selectedStatus.value.value
})

const df = new DateFormatter('ru-RU', {
  dateStyle: 'long',
})

const selectedDate = shallowRef<CalendarDate | undefined>()
const selectedTime = ref()

watch(selectedDate, () => rebuildDate())
watch(selectedTime, () => rebuildDate())

function rebuildDate() {
  if (!selectedDate.value || !selectedTime.value) {
    return
  }

  state.value.publishAt = new Date(
    `${selectedDate.value.toString()} ${selectedTime.value}`,
  ).toISOString()
}

onMounted(() => {
  selectedType.value = types.find((type) => type.value === post.value?.type)
  selectedStatus.value = statuses.find((status) => status.value === post.value?.status)

  if (!post.value?.publishAt) {
    return
  }

  const date = new Date(post.value?.publishAt)
  const parsedDate = date.toISOString().split('T')[0]

  selectedDate.value = parseDate(parsedDate ?? '')
  selectedTime.value = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
})

const state = ref<Partial<UpdatePost>>({
  description: post.value?.description ?? undefined,
  content: post.value?.content ?? undefined,
  type: post.value?.type ?? undefined,
  publishAt: post.value?.publishAt,
  status: post.value?.status,
  url: post.value?.url ?? undefined,
})

async function onSubmit(event: FormSubmitEvent<UpdatePost>) {
  const toastId = actionToast.start()
  emit('submitted')

  try {
    await $fetch(`/api/post/id/${postId}`, {
      method: 'PATCH',
      body: event.data,
    })

    await postStore.update()

    actionToast.success(toastId, t('toast.post-updated'))
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
    await $fetch(`/api/post/id/${postId}`, {
      method: 'DELETE',
    })

    await postStore.update()

    actionToast.success(toastId, t('toast.post-deleted'))
    emit('success')
  } catch (error) {
    console.error(error)
    actionToast.error(toastId)
  }
}
</script>
