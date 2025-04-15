<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import Button, { type ButtonVariant, type ButtonSize } from '@/components/elements/Button.vue'
import BasicTable, { type TableColumn } from '@/components/elements/table/Basic.vue'
import HighlightCode from '@/components/elements/HighlightCode.vue'
import { ref } from 'vue'
import Chip from '@/components/elements/Chip.vue'

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
    name: 'color',
    type: 'String',
    opsional: 'false',
    default: '',
    value: 'primary | secondary | danger | warning | info | disabled',
  },
  {
    name: 'type',
    type: 'String',
    opsional: 'false',
    default: '',
    value: 'fill | outline',
  },
  {
    name: 'label',
    type: 'String',
    opsional: 'false',
    default: '',
    value: '',
  },
]

const highlightCode = `<Chip color="primary" type="fill" label="Chip primary" />`

const value1 = ref(false)
const value2 = ref(false)
</script>

<template>
  <div id="button" class="pb-12 w-full">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-300">Chip</h3>

    <!-- Example -->
    <div class="mt-6 mx-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-gmail">
      <div class="flex flex-col flex-wrap gap-4">
        <div class="flex flex-wrap gap-2">
          <Chip color="primary" type="fill" label="Chip primary" />
          <Chip color="secondary" type="fill" label="Chip secondary" />
          <Chip color="danger" type="fill" label="Chip danger" />
          <Chip color="warning" type="fill" label="Chip warning" />
          <Chip color="info" type="fill" label="Chip info" />
        </div>
        <div class="flex flex-wrap gap-2">
          <Chip color="primary" type="outline" label="Chip primary" />
          <Chip color="secondary" type="outline" label="Chip secondary" />
          <Chip color="danger" type="outline" label="Chip danger" />
          <Chip color="warning" type="outline" label="Chip warning" />
          <Chip color="info" type="outline" label="Chip info" />
        </div>
        <div class="flex flex-wrap gap-2">
          <Chip color="disabled" type="fill" label="Chip disabled" />
          <Chip color="disabled" type="outline" label="Chip disabled" />
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
  </div>
</template>
