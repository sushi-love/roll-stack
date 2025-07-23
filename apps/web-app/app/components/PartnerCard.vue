<template>
  <ActiveCard padding="none" class="flex flex-col gap-2.5 group">
    <div class="relative">
      <img
        :src="partner.avatarUrl ?? undefined"
        alt=""
        class="aspect-square w-full rounded-lg duration-200"
        :class="{ 'opacity-75 grayscale group-hover:grayscale-0 group-hover:opacity-100': imagesMode === 'grayscale' }"
      >

      <div class="absolute top-2 left-0 right-0 w-full opacity-0 group-hover:opacity-100 duration-200">
        <div class="mx-2 px-2 py-1 bg-default/97 rounded-lg flex flex-row items-center gap-1.5">
          <UIcon name="i-lucide-scroll-text" class="shrink-0 size-5 text-secondary" />

          <UProgress
            v-model="agreementProgress"
            size="md"
            color="secondary"
          />
        </div>
      </div>
    </div>

    <div class="min-h-20 h-full px-2.5 pb-2 flex flex-col gap-2.5">
      <div class="flex flex-row items-center gap-2">
        <UBadge
          color="neutral"
          variant="outline"
          size="xl"
        >
          {{ partner.priceLevel }}
        </UBadge>

        <h3 class="text-base/5 font-bold">
          {{ partner.name }} {{ partner.surname }}
        </h3>
      </div>

      <p class="text-sm/4 text-muted line-clamp-3">
        {{ partner.legalEntity?.name }}
      </p>

      <p class="text-sm/4 text-error line-clamp-3">
        {{ partner?.legal }}
      </p>

      <p class="text-sm/4 text-muted line-clamp-3">
        {{ partner.city }}
      </p>
    </div>
  </ActiveCard>
</template>

<script setup lang="ts">
import type { Partner, PartnerAgreement, PartnerLegalEntity } from '@roll-stack/database'

const { partner } = defineProps<{
  partner: Partner & {
    legalEntity: PartnerLegalEntity | null
    activeAgreement: PartnerAgreement | null
  }
}>()

const { imagesMode } = useApp()

const agreementProgress = computed(() => {
  if (!partner?.activeAgreement?.willEndAt || !partner?.activeAgreement?.concludedAt) {
    return 0
  }

  const now = new Date()
  const concludedAt = new Date(partner.activeAgreement.concludedAt)
  const willEndAt = new Date(partner.activeAgreement.willEndAt)

  return Math.floor(100 - ((now.getTime() - concludedAt.getTime()) / (willEndAt.getTime() - concludedAt.getTime())) * 100)
})
</script>
