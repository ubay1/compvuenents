<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import Button, { type ButtonVariant, type ButtonSize } from '@/components/elements/Button.vue'
import BasicTable, { type TableColumn } from '@/components/elements/table/Basic.vue'
import HighlightCode from '@/components/elements/HighlightCode.vue'
import { ref } from 'vue'
import Chip from '@/components/elements/Chip.vue'
import dayjs from 'dayjs'
import DatePicker from '@/components/elements/DatePicker.vue'

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
    name: 'label',
    type: 'String',
    opsional: 'true',
    default: 'Pilih tanggal',
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
    name: 'format-show-date',
    type: 'String',
    opsional: 'true',
    default: 'DD MMMM YYYY',
    value: 'gunakan format dari dayjs',
  },
  {
    name: 'position-calendar',
    type: 'String',
    opsional: 'true',
    default: 'bottom-start',
    value: 'top-start | bottom-start',
  },
  {
    name: 'placeholder',
    type: 'String',
    opsional: 'true',
    default: 'Pilih tanggal',
    value: '',
  },
  {
    name: 'disabled',
    type: 'Boolean',
    opsional: 'true',
    default: 'false',
    value: 'true | false',
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
    name: 'initial-value',
    type: 'String',
    opsional: 'true',
    default: '',
    value: 'YYYY-MM-DD',
  },
  {
    name: 'is-required',
    type: 'Boolean',
    opsional: 'true',
    default: 'false',
    value: 'true | false',
  },
  {
    name: 'is-floating',
    type: 'Boolean',
    opsional: 'true',
    default: 'false',
    value: 'true | false',
  },
  {
    name: 'is-flip-list',
    type: 'Boolean',
    opsional: 'true',
    default: 'false',
    value: 'true | false',
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
    name: 'change',
    description: 'Event that will be triggered when a date is clicked on the calendar.',
  },
]

const highlightCode = `<DatePicker
  label="Test"
  theme="#499f51"
  format-show-date="DD/MM/YYYY"
  position-calendar="top-start"
  placeholder="dd/mm/yyyy"
  :disabled="false"
  :disabled-min-date="dayjs().subtract(100, 'years').format('YYYY-MM-DD')"
  :disabled-max-date="dayjs().add(20, 'years').format('YYYY-MM-DD')"
  :initial-value="dayjs().format('YYYY-MM-DD')"
  :is-required="true"
  :prepend-icon="true"
  :is-floating="true"
  :is-flip-list="true"
  :with-range="true"
  @change="($event) => console.log($event)"
/>`

const value1 = ref(false)
const value2 = ref(false)
</script>

<template>
  <div id="button" class="pb-12 w-full">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-300">Datepicker</h3>

    <!-- Example -->
    <div class="mt-6 mx-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-gmail">
      <div class="flex flex-col flex-wrap gap-4">
        <h3>DatePicker</h3>
        <DatePicker
          class=""
          label="Test Datepicker"
          theme="#499f51"
          format-show-date="DD/MM/YYYY"
          position-calendar="top-start"
          placeholder="dd/mm/yyyy"
          :disabled="false"
          :disabled-min-date="dayjs().subtract(100, 'years').format('YYYY-MM-DD')"
          :disabled-max-date="dayjs().add(20, 'years').format('YYYY-MM-DD')"
          :is-required="true"
          :prepend-icon="true"
          :is-floating="true"
          :is-flip-list="true"
          :with-range="false"
          @change="($event) => console.log($event)"
        />
        <h3>DateRangePicker</h3>
        <DatePicker
          class=""
          label="Test Date Range"
          theme="#499f51"
          format-show-date="DD/MM/YYYY"
          position-calendar="top-start"
          placeholder="dd/mm/yyyy"
          :disabled="false"
          :disabled-min-date="dayjs().subtract(100, 'years').format('YYYY-MM-DD')"
          :disabled-max-date="dayjs().add(20, 'years').format('YYYY-MM-DD')"
          :is-required="true"
          :prepend-icon="true"
          :is-floating="true"
          :is-flip-list="true"
          :with-range="true"
          @change="($event) => console.log($event)"
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
      <div class="italic text-sm mt-2">
        Note: The Datepicker component combines props from the component

        <RouterLink class="underline" to="/components/calendar">calendar</RouterLink>

        and props from the datepicker component. Below I only list the props that I currently use.
      </div>
      <BasicTable :columns="columnsProps" :data="dataProps" />
    </div>

    <!-- Events -->
    <div class="mt-6">
      <h4 class="text-lg font-medium text-gray-900 dark:text-gray-300">Events</h4>
      <BasicTable :columns="columnsEvents" :data="dataEvents" />
    </div>
  </div>
</template>
