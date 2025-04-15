<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import Button, { type ButtonVariant, type ButtonSize } from '@/components/elements/Button.vue'
import BasicTable, { type TableColumn } from '@/components/elements/table/Basic.vue'
import HighlightCode from '@/components/elements/HighlightCode.vue'
import Checkbox from '@/components/elements/Checkbox.vue'
import { ref } from 'vue'

const variantsButton: ButtonVariant[] = ['primary', 'secondary', 'danger', 'warning', 'info']
const sizeButton: ButtonSize[] = ['xs', 'sm', 'md', 'lg']

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
    name: 'color',
    type: 'String',
    opsional: 'true',
    default: '#3b82f6',
    value: '',
  },
  {
    name: 'label',
    type: 'String',
    opsional: 'true',
    default: '',
    value: '',
  },
  {
    name: 'model-value',
    type: 'Boolean',
    opsional: 'false',
    default: '',
    value: 'true | false',
  },
  {
    name: 'disabled',
    type: 'Boolean',
    opsional: 'true',
    default: 'false',
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
    name: 'update:model-value',
    description: 'Event yang akan dijalankan ketika checkbox diklik.',
  },
]

const highlightCode = `<Checkbox
  color="#499f51"
  label="Test 1"
  :model-value="value1"
  :disabled="false"
  @update:model-value="value1 = $event"
/>`

const value1 = ref(false)
const value2 = ref(false)
</script>

<template>
  <div id="button" class="pb-12 w-full">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-300">Checkbox</h3>

    <!-- Example -->
    <div class="mt-6 mx-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-gmail">
      <div class="flex flex-col flex-wrap gap-4">
        <div class="flex flex-col flex-wrap gap-2">
          <Checkbox
            color="#499f51"
            label="Test 1"
            :model-value="value1"
            :disabled="false"
            @update:model-value="value1 = $event"
          />
          <Checkbox
            color="#499f51"
            label="Disabled"
            :model-value="value2"
            :disabled="true"
            @update:model-value="value2 = $event"
          />
        </div>
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

    <!-- Events -->
    <div class="mt-6">
      <h4 class="text-lg font-medium text-gray-900 dark:text-gray-300">Events</h4>
      <BasicTable :columns="columnsEvents" :data="dataEvents" />
    </div>
  </div>
</template>
