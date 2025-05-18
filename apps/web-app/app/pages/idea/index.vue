<template>
  <Header title="Общие идеи">
    <UButton
      size="lg"
      variant="solid"
      color="secondary"
      class="w-full md:w-fit"
      icon="i-lucide-lightbulb"
      :label="t('app.create.idea.button')"
      @click="modalCreateIdea.open()"
    />
  </Header>

  <Content>
    <UContainer class="mb-20 max-w-lg">
      <div class="flex flex-col gap-6">
        <div class="my-8 w-full grid grid-cols-2 gap-2">
          <div class="px-4 flex flex-col gap-2 items-center">
            <div class="flex flex-row gap-2 items-center">
              <UIcon name="fluent-emoji-flat:magic-wand" class="size-12" />
              <h2 class="text-4xl font-bold text-secondary">
                46
              </h2>
            </div>
            <div class="text-sm leading-4 text-muted">
              Идей в очереди
            </div>
          </div>
          <div class="px-4 flex flex-col gap-2 items-center text-center">
            <div class="flex flex-row gap-2 items-center">
              <UIcon name="fluent-emoji-flat:party-popper" class="size-12" />
              <h2 class="text-4xl font-bold text-secondary">
                8
              </h2>
            </div>
            <div class="text-sm leading-4 text-muted">
              Идей реализовано в этом месяце
            </div>
          </div>
        </div>

        <NuxtLink
          v-for="idea in ideas"
          :key="idea.id"
          :to="`/idea/${idea.id}`"
        >
          <ActiveCard class="flex flex-col gap-5">
            <p class="text-lg leading-6">
              {{ idea.text }}
            </p>

            <div class="flex flex-row justify-between items-center">
              <UAvatarGroup :max="4" size="sm">
                <UAvatar
                  v-for="like in idea.likes"
                  :key="like.id"
                  :src="like.avatar"
                  alt=""
                />
              </UAvatarGroup>

              <UButton
                variant="outline"
                color="neutral"
                size="md"
                trailing-icon="fluent-emoji-flat:red-heart"
              >
                Поддержать идею
              </UButton>
            </div>
          </ActiveCard>
        </NuxtLink>
      </div>
    </UContainer>
  </Content>
</template>

<script setup lang="ts">
import { ModalCreateIdea } from '#components'

useHead({
  title: 'Предложить идею',
})

const { t } = useI18n()

const overlay = useOverlay()
const modalCreateIdea = overlay.create(ModalCreateIdea)

const ideas = computed(() => [
  {
    id: '2422',
    text: 'Не удобно постоянно запрашивать информацию о конкретном заказе у IT отдела. Давайте сделаем прямо тут запрос, чтобы можно было найти заказ по номеру 🥺',
    likes: generateLikes(6),
  },
  {
    id: '875484',
    text: 'Хочется сделать систему уведомлений, чтобы я мог откладывать задачу на потом (на неделю вперед). Потом получить уведомление с напоминанием.',
    likes: generateLikes(6),
  },
  {
    id: '32435454g3',
    text: 'Го сделаем реферальную программу по-новому - не только за первый заказ бонусы, а за все покупки друга. Больше мотивации будет звать друзей!',
    likes: generateLikes(4),
  },
  {
    id: '243243',
    text: 'А давайте сделаем специальные слоты для доставки? Клиенты выбирают удобное время и получают скидку. Все довольны будут!',
    likes: generateLikes(3),
  },
  {
    id: '324354543',
    text: 'Предлагаю открыть курсы по суши! Клиенты смогут научиться готовить, получат сертификат и скидки на ингредиенты. Почему бы нет?',
    likes: generateLikes(3),
  },
  {
    id: '432432',
    text: 'Предлагаю разработать диетические наборы с учетом калорий и БЖУ. Можно даже персональные меню составлять. Сейчас это очень актуально!',
    likes: generateLikes(2),
  },
  {
    id: '3243543',
    text: 'Сделать онлайн-конструктор роллов! Клиенты сами будут собирать свои наборы, а я им советы давать буду. Типа игра такая кулинарная.',
    likes: generateLikes(2),
  },
  {
    id: '34324',
    text: 'Я тут подумал - а если сделать такие коробки, которые можно использовать как контейнеры? Клиенты их возвращают - получают скидку. И для экологии хорошо, и людям плюс.',
    likes: generateLikes(2),
  },
  {
    id: '43432',
    text: 'А че если сделать такую штуку - бонусы не только себе копишь, но и всей семье? Типа семейный аккаунт. И наборы семейные сделаем особые. Как думаете?',
    likes: generateLikes(1),
  },
  {
    id: '123',
    text: 'Ребят, а давайте сделаем приложение с AR? Типа навел камеру на QR-код, а там твоё суши крутиться и все ингредиенты видно! Прикольная же фича будет!',
    likes: generateLikes(1),
  },
])

const user = useUserStore()

function generateLikes(amount: number) {
  const likes = []

  for (let i = 0; i < amount; i++) {
    const randUser = user.users[getRandInteger(0, user.users.length - 1)]
    if (!randUser) {
      continue
    }

    likes.push({
      id: randUser.id,
      avatar: randUser.avatar ?? undefined,
    })
  }

  return likes
}
</script>
