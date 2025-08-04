<template>
  <div class="flex flex-row gap-1.5 items-center">
    <UPopover
      v-for="file in files"
      :key="file.id"
      mode="hover"
      :content="{
        align: 'center',
        side: 'bottom',
        sideOffset: 8,
      }"
    >
      <ULink
        :to="file.url"
        external
        target="_blank"
      >
        <UIcon
          :name="getFileData(file).icon"
          :class="getFileData(file).class"
          class="size-5 hover:scale-110 duration-200"
        />
      </ULink>

      <template #content>
        <div class="h-auto w-56 p-4 flex flex-col gap-2">
          <UIcon
            :name="getFileData(file).icon"
            class="size-10 text-muted/25"
          />

          <div class="flex flex-col gap-2.5">
            <h4 class="text-base/5">
              {{ file.name }}
            </h4>

            <UButton
              size="sm"
              variant="outline"
              color="neutral"
              :to="file.url"
              icon="i-lucide-external-link"
              external
              target="_blank"
              class="w-fit"
            >
              Открыть
            </UButton>
          </div>
        </div>
      </template>
    </UPopover>
  </div>
</template>

<script setup lang="ts">
import type { File } from '@roll-stack/database'
import { ULink } from '#components'

defineProps<{ files: File[] }>()

function getFileData(file: File) {
  if (file.name.startsWith('Договор к')) {
    return {
      type: 'main',
      icon: 'i-lucide-book-text',
      class: 'text-secondary',
    }
  }
  if (file.name.startsWith('Акт о при')) {
    return {
      type: 'act',
      icon: 'i-lucide-file-text',
      class: '',
    }
  }

  return {
    type: 'unknown',
    icon: 'i-lucide-file',
    class: '',
  }
}
</script>
