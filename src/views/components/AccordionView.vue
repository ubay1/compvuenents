<script setup lang="ts">
import BasicTable, { type TableColumn } from '@/components/elements/table/Basic.vue'
import Accordion from '@/components/elements/Accordion.vue'
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
    name: 'items',
    type: '{title: string, description: string}[]',
    opsional: 'false',
    default: '',
    value: '',
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
    name: '',
    description: '',
  },
]

const accordionItems = [
  { title: 'Section 1', description: 'description section 1' },
  { title: 'Section 2', description: '' },
  { title: 'Section 3', description: '' },
]

const highlightCode = `const accordionItems = [
  { title: 'Section 1', description: 'description section 1' },
  { title: 'Section 2', description: '' },
  { title: 'Section 3', description: '' },
]

<Accordion :items="accordionItems">
  <template #content-0>
    <p>Custom content for section 1.</p>
    <p>This content is passed via slots.</p>
  </template>
  <template #content-1>
    <p>Custom content for section 2.</p>
    <ul class="list-disc pl-5">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </template>
  <template #content-2>
    <p>Custom content for section 3.</p>
    <button class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Click Me</button>
  </template>
</Accordion>`
</script>

<template>
  <div id="button" class="pb-12 w-full">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-300">Accordion</h3>

    <!-- Example -->
    <div class="mt-6 mx-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-gmail">
      <div class="mt-4 flex flex-col flex-wrap gap-4">
        <Accordion :items="accordionItems">
          <template #content-0>
            <p>Custom content for section 1.</p>
            <p>This content is passed via slots.</p>
          </template>
          <template #content-1>
            <p>Custom content for section 2.</p>
            <ul class="list-disc pl-5">
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </template>
          <template #content-2>
            <p>Custom content for section 3.</p>
            <button class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Click Me</button>
          </template>
        </Accordion>
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

    <!-- Slots -->
    <div class="mt-6">
      <h4 class="text-lg font-medium text-gray-900 dark:text-gray-300">Events</h4>
      <BasicTable :columns="columnsEvents" :data="dataEvents" />
    </div>
  </div>
</template>
