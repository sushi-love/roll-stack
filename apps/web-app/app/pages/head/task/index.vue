<template>
  <Content>
    <div class="flex flex-wrap items-center justify-between gap-1.5">
      <div class="flex flex-row gap-2.5">
        <UInput
          v-model="filterValue"
          placeholder="По названию"
          icon="i-lucide-search"
          class="w-48"
        />

        <USelectMenu
          v-model="selectedPerformer"
          :items="availablePerformers"
          placeholder="Исполнитель"
          class="w-48"
        />

        <USelectMenu
          v-model="selectedResolution"
          :items="availableResolutions"
          placeholder="Резолюция"
          class="w-48"
        />
      </div>

      <div class="flex flex-wrap items-center gap-1.5">
        <UDropdownMenu
          :items="
            table?.tableApi
              ?.getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => ({
                label: upperFirst(column.id),
                type: 'checkbox' as const,
                checked: column.getIsVisible(),
                onUpdateChecked(checked: boolean) {
                  table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
                },
                onSelect(e?: Event) {
                  e?.preventDefault()
                },
              }))
          "
          :content="{ align: 'end' }"
        >
          <UButton
            :label="$t('common.columns')"
            color="neutral"
            variant="outline"
            trailing-icon="i-lucide-settings-2"
          />
        </UDropdownMenu>
      </div>
    </div>

    <UTable
      ref="table"
      v-model:column-filters="columnFilters"
      v-model:column-visibility="columnVisibility"
      v-model:pagination="pagination"
      :data="dataFiltered"
      :columns="columns"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }"
      class="shrink-0"
      :ui="{
        base: 'table-fixed border-separate border-spacing-0',
        thead: '[&>tr]:after:content-none',
        tbody: '[&>tr]:last:[&>td]:border-b-0',
        th: 'py-1 bg-elevated/50 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
        td: 'border-b border-default [&:has([data-media=true]))]:px-0 [&:has([data-media=true]))]:max-w-10 [&:has([data-action=true]))]:pr-0',
      }"
    >
      <template #id-cell="{ row }">
        {{ row.getValue('id') }}
      </template>
      <template #performerId-cell="{ row }">
        <div class="flex items-center justify-center">
          <UserPopover :user="userStore.staff.find((staff) => staff.id === row.getValue('performerId'))">
            <NuxtLink :to="`/staff/${row.getValue('performerId')}`">
              <UAvatar :src="userStore.staff.find((staff) => staff.id === row.getValue('performerId'))?.avatarUrl ?? undefined" class="hover:scale-110 duration-200" />
            </NuxtLink>
          </UserPopover>
        </div>
      </template>
      <template #name-cell="{ row }">
        <h4 class="text-default font-medium text-sm/4 whitespace-pre-wrap max-w-64">
          {{ row.getValue('name') }}
        </h4>
      </template>
      <template #description-cell="{ row }">
        <div class="text-sm/4 whitespace-pre-wrap max-w-64">
          {{ row.getValue('description') }}
        </div>
      </template>
      <template #updatedAt-cell="{ row }">
        {{ row.getValue('updatedAt') ? df.format(new Date(row.getValue('updatedAt'))) : '' }}
      </template>
      <template #completedAt-cell="{ row }">
        {{ row.getValue('completedAt') ? df.format(new Date(row.getValue('completedAt'))) : '' }}
      </template>
      <template #resolution-cell="{ row }">
        <div class="relative flex items-center justify-center">
          <UPopover
            mode="hover"
            :content="{
              align: 'center',
              side: 'bottom',
              sideOffset: 8,
            }"
          >
            <div>
              <UIcon
                v-if="row.getValue('resolution')"
                :name="getResolutionIcon(row.getValue('resolution'))"
                class="size-6"
              />
            </div>

            <template #content>
              <div class="h-auto w-64 p-4 flex flex-col gap-2 text-sm/4">
                <h4 class="text-base/5 font-semibold">
                  {{ getLocalizedResolution(row.getValue('resolution')) }}
                </h4>

                {{ row.getValue('report') }}
              </div>
            </template>
          </UPopover>
        </div>
      </template>
      <template #report-cell="{ row }">
        <div class="text-sm/4 whitespace-pre-wrap max-w-64">
          {{ row.getValue('report') }}
        </div>
      </template>
      <!-- <template #action-cell="{ row }">
        <div class="flex items-end" data-action="true">
          <UDropdownMenu
            :items="getDropdownActions(row.original as Task)"
            :content="{ align: 'end' }"
            class="ml-auto"
          >
            <UButton
              icon="i-lucide-ellipsis-vertical"
              color="neutral"
              variant="outline"
            />
          </UDropdownMenu>
        </div>
      </template> -->
    </UTable>

    <div class="flex items-center justify-between gap-3 border-t border-default pt-4 mt-auto">
      <div v-if="table?.tableApi?.getFilteredSelectedRowModel().rows.length" class="text-sm text-muted">
        {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} {{ t('common.table.rows-selected', table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0) }}
        {{ $t('common.table.rows-from') }} {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }}
      </div>
      <div v-else class="text-sm text-muted">
        {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} {{ t('common.table.rows', table?.tableApi?.getFilteredRowModel().rows.length || 0) }}
      </div>

      <div class="flex items-center gap-1.5">
        <UPagination
          :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
          :items-per-page="table?.tableApi?.getState().pagination.pageSize"
          :total="table?.tableApi?.getFilteredRowModel().rows.length"
          @update:page="(p: number) => table?.tableApi?.setPageIndex(p - 1)"
        />
      </div>
    </div>
  </Content>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Task } from '@sushi-atrium/database'
import { NuxtLink } from '#components'
import { DateFormatter } from '@internationalized/date'
import { getPaginationRowModel } from '@tanstack/table-core'
import { upperFirst } from 'scule'
import { getLocalizedResolution, getResolutionForSelect } from '~~/shared/utils/helpers'

useHead({
  title: 'Все задачи',
})

const { t } = useI18n()

const { data } = await useFetch('/api/task/list/completed')

const userStore = useUserStore()

const availablePerformers = computed(() => [{
  label: 'Все исполнители',
  value: '',
  avatar: {
    src: undefined,
    alt: '',
  },
  onSelect: () => {
    selectedPerformer.value = undefined
  },
}, {
  label: 'Нет исполнителя',
  value: 'empty',
  avatar: {
    src: undefined,
    alt: '',
  },
}, ...userStore.staff.map((staff) => ({
  label: `${staff.name} ${staff.surname}`,
  value: staff.id,
  avatar: {
    src: staff.avatarUrl ?? undefined,
    alt: '',
  },
}))])

const selectedPerformer = ref<{ label: string, value: string, avatar: { src: string | undefined, alt: string } } | undefined>()

const availableResolutions = computed(() => [{
  label: 'Все статусы',
  value: '',
  onSelect: () => {
    selectedResolution.value = undefined
  },
}, {
  label: 'Без резолюции',
  value: 'empty',
}, ...getResolutionForSelect()])

const selectedResolution = ref<{ label: string, value: string, icon: string } | undefined>()

const filterValue = ref('')

const dataFiltered = computed(() => {
  let finalRows = data.value?.filter((t) => t.name.toLowerCase().includes(filterValue.value.toLowerCase()))

  if (selectedPerformer.value?.value) {
    if (selectedPerformer.value?.value === 'empty') {
      finalRows = finalRows?.filter((t) => t.performerId === null)
    } else {
      finalRows = finalRows?.filter((t) => t.performerId === selectedPerformer.value?.value)
    }
  }

  if (selectedResolution.value?.value) {
    if (selectedResolution.value?.value === 'empty') {
      finalRows = finalRows?.filter((t) => t.resolution === null)
    } else {
      finalRows = finalRows?.filter((t) => t.resolution === selectedResolution.value?.value)
    }
  }

  return finalRows
})

const columnFilters = ref([{
  id: 'id',
  value: '',
}])
const columnVisibility = ref({
  id: false,
  report: false,
})
const pagination = ref({
  pageIndex: 0,
  pageSize: 25,
})

const columns: Ref<TableColumn<Task>[]> = ref([{
  accessorKey: 'id',
  header: 'Id',
}, {
  accessorKey: 'performerId',
  enableSorting: false,
  header: 'Исполнитель',
}, {
  accessorKey: 'name',
  header: 'Название',
},
{
  accessorKey: 'description',
  header: 'Описание',
}, {
  accessorKey: 'updatedAt',
  header: 'Дата обновления',
}, {
  accessorKey: 'completedAt',
  header: 'Дата закрытия',
}, {
  accessorKey: 'resolution',
  header: 'Резолюция',
}, {
  accessorKey: 'report',
  header: 'Отчет',
}, {
  id: 'action',
  enableSorting: false,
  enableHiding: false,
}])

// function getDropdownActions(_: Task): DropdownMenuItem[][] {
//   return [
//     [
//       {
//         type: 'label',
//         label: t('common.actions'),
//       },
//       // {
//       //   label: t('common.open-page'),
//       //   type: 'link',
//       //   to: `/menu/${category.menuId}/category/${category.id}`,
//       //   icon: 'i-lucide-notebook-text',
//       // },
//     ],
//   ]
// }

const table = useTemplateRef('table')

const df = new DateFormatter('ru-RU', {
  dateStyle: 'long',
})
</script>
