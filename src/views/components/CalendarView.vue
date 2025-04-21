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
    label: 'Default Value',
  },
  {
    key: 'value',
    label: 'Value',
  },
]
const dataProps = [
  {
    name: 'width',
    type: 'String',
    opsional: 'true',
    default: '',
    value: '',
  },
  {
    name: 'theme',
    type: 'String',
    opsional: 'true',
    default: '#00b8ac',
    value: '',
  },
  {
    name: 'dot-color',
    type: 'String',
    opsional: 'true',
    default: '#00b8ac',
    value: '',
  },
  {
    name: 'dot-active',
    type: 'Boolean',
    opsional: 'true',
    default: '',
    value: 'true | false',
  },
  {
    name: 'disabled-weekend',
    type: 'Boolean',
    opsional: 'true',
    default: '',
    value: 'true | false',
  },
  {
    name: 'disabled-only-sunday',
    type: 'Boolean',
    opsional: 'true',
    default: '',
    value: 'true | false',
  },
  {
    name: 'disabled-only-saturday',
    type: 'Boolean',
    opsional: 'true',
    default: '',
    value: 'true | false',
  },
  {
    name: 'initial-value',
    type: 'String',
    opsional: 'true',
    default: '',
    value: 'YYYY-MM-DD',
  },
  {
    name: 'default-view',
    type: 'String',
    opsional: 'true',
    default: '',
    value: 'YYYY-MM-DD',
  },
  {
    name: 'disabled-min-date',
    type: 'String',
    opsional: 'true',
    default: '',
    value: 'YYYY-MM-DD',
  },
  {
    name: 'disabled-max-date',
    type: 'String',
    opsional: 'true',
    default: '',
    value: 'YYYY-MM-DD',
  },
  {
    name: 'disabled-dates',
    type: 'Array',
    opsional: 'true',
    default: '',
    value: '[{ date: YYYY-MM-DD, label: string }]',
  },
  {
    name: 'value-for-date',
    type: 'Array',
    opsional: 'true',
    default: '',
    value: '[ { date: YYYY-MM-DD, value: string } ] ',
  },
  {
    name: 'with-range',
    type: 'Boolean',
    opsional: 'true',
    default: '',
    value: 'true | false',
  },
]

const columnsEvents: TableColumn[] = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'description',
    label: 'Description',
  },
]
const dataEvents = [
  {
    name: 'onSelectedDate',
    description: 'Event that will be triggered when a date is clicked on the calendar.',
  },
]

const highlightCode = `<Calendar
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
  :disabled-dates="[{ date: '2025-03-31', label: 'Idul Fitri 1446 H' }]"
  :value-for-date="[
    { date: '2025-02-01', value: '20' },
    { date: '2025-02-02', value: '20' },
    { date: '2025-02-03', value: '20' },
    { date: '2025-02-04', value: '20' },
    { date: '2025-02-05', value: '20' },
    { date: '2025-02-06', value: '20' },
    { date: '2025-02-10', value: '35' },
  ]"
  :with-range="false"
/>`
</script>

<template>
  <div id="button" class="pb-12 w-full">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-300">Calendar</h3>

    <!-- Example -->
    <div class="mt-6 mx-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-gmail">
      <div class="mt-4 flex flex-col flex-wrap gap-4">
        <h3>Calender without props with-range</h3>
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
          :disabled-dates="[{ date: '2025-03-31', label: 'Idul Fitri 1446 H' }]"
          :value-for-date="[
            { date: '2025-02-01', value: '20' },
            { date: '2025-02-02', value: '20' },
            { date: '2025-02-03', value: '20' },
            { date: '2025-02-04', value: '20' },
            { date: '2025-02-05', value: '20' },
            { date: '2025-02-06', value: '20' },
            { date: '2025-02-10', value: '35' },
          ]"
          :with-range="false"
        />

        <h3>Calender with props with-range</h3>
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
          :disabled-dates="[{ date: '2025-03-31', label: 'Idul Fitri 1446 H' }]"
          :value-for-date="[
            { date: '2025-02-01', value: '20' },
            { date: '2025-02-02', value: '20' },
            { date: '2025-02-03', value: '20' },
            { date: '2025-02-04', value: '20' },
            { date: '2025-02-05', value: '20' },
            { date: '2025-02-06', value: '20' },
            { date: '2025-02-10', value: '35' },
          ]"
          :with-range="true"
        />
      </div>
    </div>

    <!-- Usage -->
    <div class="mt-6">
      <h4 class="text-lg font-medium text-gray-900 dark:text-gray-300">Usage</h4>
      <HighlightCode language="">
        {{ highlightCode }}
      </HighlightCode>
    </div>

    <!-- Props -->
    <div class="mt-6">
      <h4 class="text-lg font-medium text-gray-900 dark:text-gray-300">Props</h4>
      <BasicTable :columns="columnsProps" :data="dataProps" />
    </div>

    <!-- Events -->
    <div class="mt-6">
      <h4 class="text-lg font-medium text-gray-900 dark:text-gray-300">Events</h4>
      <BasicTable :columns="columnsEvents" :data="dataEvents" />
    </div>
  </div>
</template>
