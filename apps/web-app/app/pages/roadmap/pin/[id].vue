<template>
  <Header :title="t('app.menu.roadmap-pin')" />

  <Content class="max-w-2xl space-y-6">
    <div class="flex flex-col gap-5">
      <h1 class="text-xl md:text-3xl font-bold">
        {{ data?.title }}
      </h1>

      <div class="w-full text-lg leading-6 whitespace-pre-wrap break-words">
        {{ data?.text }}
      </div>

      <div class="flex flex-row items-center gap-2">
        <UBadge
          :icon="getCategoryInfo(data?.category ?? '')?.icon"
          size="lg"
          color="neutral"
          variant="outline"
        >
          {{ getCategoryInfo(data?.category ?? '')?.title }}
        </UBadge>

        <UBadge
          icon="i-lucide-calendar-check-2"
          size="lg"
          color="neutral"
          variant="outline"
        >
          {{ data?.date }}
        </UBadge>
      </div>
    </div>

    <div>
      <UCard
        variant="subtle"
        class="mt-auto bg-elevated/25"
        :ui="{ body: '!p-4' }"
      >
        <form class="flex flex-col gap-4" @submit.prevent="onCommentSubmit">
          <UTextarea
            v-model="reply"
            color="neutral"
            variant="none"
            required
            autoresize
            placeholder="Напишите свою мысль..."
            :rows="3"
            :disabled="loading"
            class="w-full"
            :ui="{ base: 'p-0 resize-none text-xl leading-6' }"
          />

          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <UAvatar
                :src="user.avatar ?? undefined"
                alt=""
                class="size-8"
              />
              <p class="text-sm font-semibold">
                {{ user.fullName }}
              </p>
            </div>

            <UButton
              type="submit"
              color="secondary"
              size="lg"
              :loading="loading"
              label="Добавить комментарий"
              icon="i-lucide-send"
            />
          </div>
        </form>
      </UCard>
    </div>
  </Content>
</template>

<script setup lang="ts">
const { t } = useI18n()
const toast = useToast()
const { params } = useRoute('roadmap-pin-id')

const user = useUserStore()

const { data, error } = await useFetch(`/api/roadmap/pin/${params.id}`)
if (error.value) {
  await navigateTo('/')
}

const reply = ref('')
const loading = ref(false)

function onCommentSubmit() {
  loading.value = true

  setTimeout(() => {
    reply.value = ''

    toast.add({
      title: 'Комментарий добавлен!',
      description: 'Сейчас он появится на странице.',
      icon: 'i-lucide-check-circle',
      color: 'success',
    })

    loading.value = false
  }, 1000)
}
</script>
