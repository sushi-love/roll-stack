<template>
  <Content>
    <div class="max-w-lg grid grid-cols-1 gap-4">
      <div class="bg-elevated/50 rounded-lg px-4 md:px-6 py-5 space-y-6">
        <!-- <ProductImage
          :id="product?.mediaId"
          :media="product?.media"
          :lazy="false"
          size="md"
        /> -->

        <!-- <div class="absolute top-2 left-2 bg-default rounded-lg">
          <UButton
            variant="subtle"
            color="neutral"
            size="xl"
            icon="i-lucide-image-up"
            class="p-3 justify-center items-center"
            @click="modalUploadProductImage.open({ productId: product?.id })"
          />
        </div> -->

        <div>
          <FileUploadEmptyArea label="Основной файл" />
        </div>

        <div class="flex flex-col gap-1">
          <h3 class="text-muted text-sm">
            Описание:
          </h3>

          <div>
            <div v-if="print?.description" class="whitespace-pre-wrap font-medium">
              {{ print.description }}
            </div>
            <p v-else class="text-dimmed">
              Нет описания
            </p>
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <h3 class="text-muted text-sm">
            Важно:
          </h3>

          <div>
            <div v-if="print?.importantInfo" class="whitespace-pre-wrap font-medium">
              {{ print.importantInfo }}
            </div>
            <p v-else class="text-dimmed">
              Тут пусто
            </p>
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <h3 class="text-muted text-sm">
            Техническая информация:
          </h3>

          <div>
            <div v-if="print?.technicalInfo" class="whitespace-pre-wrap font-medium">
              {{ print.technicalInfo }}
            </div>
            <p v-else class="text-dimmed">
              Тут пусто
            </p>
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <h3 class="text-muted text-sm">
            Обычный тираж:
          </h3>

          <div class="whitespace-pre-wrap font-medium">
            {{ print?.regularAmount }}
          </div>
        </div>
      </div>
    </div>
  </Content>
</template>

<script setup lang="ts">
const { params } = useRoute('print-printId')

const printStore = usePrintStore()
const print = computed(() => printStore.prints.find((p) => p.id === params.printId))
if (!print.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Материал не найден',
  })
}
</script>
