<template>
  <div class="w-full h-screen mx-auto grid grid-cols-1 lg:grid-cols-2">
    <div class="hidden lg:block bg-[#54b948]">
      <img
        src="/sushi-heart.svg"
        alt=""
        class="w-2/3 opacity-10 brightness-[1000] absolute bottom-0 left-0 motion-preset-pulse motion-duration-4000"
      >
    </div>

    <div class="my-4 flex flex-col justify-between items-center bg-default z-10">
      <div class="flex-grow flex flex-col justify-center items-center">
        <UContainer>
          <h1 class="mb-10 text-2xl md:text-3xl font-bold text-center">
            {{ $t('app.welcome-message') }}
          </h1>

          <div class="mx-auto max-w-[250px]">
            <form v-if="state.step === 1" class="space-y-4">
              <UInput
                v-model="state.phone"
                placeholder="Номер телефона"
                type="tel"
                required
                size="xl"
                maxlength="16"
                class="w-full"
                @change="formatPhone"
              />

              <UButton
                :disabled="!isPhoneValid"
                :loading="status === 'pending'"
                trailing-icon="i-lucide-arrow-right"
                variant="solid"
                color="primary"
                size="xl"
                class="w-full justify-between"
                label="Получить код"
                @click="sendCode"
              />
            </form>

            <form v-if="state.step === 2" class="space-y-4">
              <UPinInput
                v-model="state.code"
                type="number"
                otp
                :length="6"
                required
                size="lg"
                class="w-full justify-center"
              />

              <UButton
                :disabled="!isCodeValid"
                :loading="status === 'pending'"
                trailing-icon="i-lucide-arrow-right"
                variant="solid"
                color="primary"
                size="xl"
                class="w-full justify-between"
                :label="$t('common.sign-in')"
                @click="signIn()"
              />
            </form>
          </div>
        </UContainer>
      </div>

      <ColorModeToggle />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'empty',
  middleware: ['02-guest-only'],
})

const { t } = useI18n()

useHead({
  title: t('app.welcome-message'),
})

const { fetch: refreshSession } = useUserSession()
const user = useUserStore()

const toast = useToast()

const state = ref({
  step: 1,
  phone: '',
  code: [],
})

const isPhoneValid = ref(false)
const isCodeValid = computed(() => state.value.code.length === 6)

watch(
  () => state.value.phone,
  () => {
    if (!state.value.phone) {
      return
    }
    if (state.value.phone?.length > 17) {
      return
    }

    getPhoneNumberFormatter('RU').input(state.value.phone)
    isPhoneValid.value = checkPhoneNumberValidity(state.value.phone, 'RU')
  },
)

function formatPhone() {
  if (!state.value.phone) {
    return
  }

  getPhoneNumberFormatter('RU').input(state.value.phone)
  state.value.phone = formatPhoneNumber(state.value.phone, 'RU')
}

function sendCode() {
  state.value.step = 2
  toast.add({
    title: 'Код отправлен',
    description: 'Введите полученный код. Если код не приходит в течении 60 секунд, перезагрузите страницу и попробуйте снова.',
    duration: 20000,
  })
}

const { status, execute: signIn } = await useFetch('/api/auth/sign-in', {
  method: 'POST',
  body: state,
  immediate: false,
  watch: false,
  onResponse: async ({ response }) => {
    if (response.ok) {
      await refreshSession()
      await user.update()
      await navigateTo('/')
    }
  },
  onResponseError: async () => {
    state.value.code = []

    toast.add({
      title: 'Ошибка',
      description: 'Проверьте актуальность введенных данных.',
    })
  },
})
</script>
