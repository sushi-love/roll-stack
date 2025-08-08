<template>
  <UCard v-if="entity" class="h-full">
    <div class="flex flex-col gap-2.5">
      <UIcon name="i-lucide-scale" class="size-16 text-muted/25" />

      <h3 class="text-xl md:text-xl/6 font-semibold">
        {{ entity.name }}
      </h3>

      <div>
        <p>ИНН {{ entity.inn }}</p>
        <p v-if="entity.ogrnip">
          ОГРНИП {{ entity.ogrnip }}
        </p>
      </div>

      <p class="text-muted">
        {{ entity.comment }}
      </p>
    </div>
  </UCard>
  <CreateCard
    v-else
    label="Добавить юридическое лицо"
    icon="i-lucide-scale"
    @click="modalCreatePartnerLegalEntity.open({ partnerId })"
  />
</template>

<script setup lang="ts">
import type { PartnerLegalEntity } from '@roll-stack/database'
import { ModalCreatePartnerLegalEntity } from '#components'

defineProps<{ partnerId: string, entity: PartnerLegalEntity | null | undefined }>()

const overlay = useOverlay()
const modalCreatePartnerLegalEntity = overlay.create(ModalCreatePartnerLegalEntity)
</script>
