<script setup lang="ts">
import dayjs from 'dayjs'
import Calendar from '@/components/elements/Calendar.vue'
import BasicTable, { type TableColumn } from '@/components/elements/table/Basic.vue'
import HighlightCode from '@/components/elements/HighlightCode.vue'

const columnsProps: TableColumn[] = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'type',
    label: 'Type',
  },
  {
    key: 'opsional',
    label: 'Opsional',
  },
  {
    key: 'default',
    label: 'Default',
  },
  {
    key: 'value',
    label: 'List Value',
  },
]
const dataProps = [
  {
    name: 'title',
    type: 'String',
    opsional: 'true',
    default: '',
    value: '',
  },
  {
    name: 'description',
    type: 'String',
    opsional: 'true',
    default: '',
    value: '',
  },
  {
    name: 'imageUrl',
    type: 'String',
    opsional: 'true',
    default: '',
    value: '',
  },
  {
    name: 'imageAlt',
    type: 'String',
    opsional: 'true',
    default: 'Card image',
    value: '',
  },
]

const columnsSlots: TableColumn[] = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'description',
    label: 'Description',
  },
]
const dataSlots = [
  {
    name: '<slot></slot>',
    description: 'untuk menampilkan data content dinamis',
  },
  {
    name: '<template #footer></template>',
    description: 'untuk menampilkan footer pada card',
  },
]

const highlightCode = `<Card title="Card Title">
  <p class="text-gray-500 dark:text-gray-300">
    This is card description in the default slot
  </p>
  <div>🤖🤖 Holla</div>

  <template #footer>
    <button>Action Button</button>
  </template>
</Card>`
</script>

<template>
  <div id="button" class="pb-12 w-full">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-300">Card</h3>

    <!-- Example -->
    <div class="mt-6 mx-1 bg-white p-6 rounded-lg shadow-gmail">
      <div class="mt-4 flex flex-col flex-wrap gap-4">
        <Calendar
          width="320px"
          theme="#00a63e"
          dot-color="#00a63e"
          :disabled-weekend="false"
          :disabled-only-sunday="true"
          :disabled-only-saturday="false"
          :initial-value="dayjs().format('YYYY-MM-DD')"
          :default-view="dayjs().format('YYYY-MM-DD')"
          :dot-active="true"
          :disabled-min-date="dayjs().subtract(1, 'month').format('YYYY-MM-DD')"
          :disabled-max-date="dayjs().add(30, 'days').format('YYYY-MM-DD')"
          :value-for-date="[
            { date: '2025-02-01', value: '20' },
            { date: '2025-02-02', value: '20' },
            { date: '2025-02-03', value: '20' },
            { date: '2025-02-04', value: '20' },
            { date: '2025-02-05', value: '20' },
            { date: '2025-02-06', value: '20' },
            { date: '2025-02-10', value: '35' },
          ]"
        />
      </div>
    </div>

    <!-- Usage -->
    <div class="mt-6">
      <h4 class="text-lg font-medium text-gray-900 dark:text-gray-300">Penggunaan</h4>
      <HighlightCode language="">
        {{ highlightCode }}
      </HighlightCode>
    </div>

    <!-- Props -->
    <div class="mt-6">
      <h4 class="text-lg font-medium text-gray-900 dark:text-gray-300">Props</h4>
      <BasicTable :columns="columnsProps" :data="dataProps" />
    </div>

    <!-- Slots -->
    <div class="mt-6">
      <h4 class="text-lg font-medium text-gray-900 dark:text-gray-300">Slots</h4>
      <BasicTable :columns="columnsSlots" :data="dataSlots" />
    </div>
  </div>
</template>
