<script setup lang="ts">
import Card from '@/components/elements/Card.vue'
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
    <div class="mt-6 mx-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-gmail">
      <div class="mt-4 flex flex-col flex-wrap gap-4">
        <Card
          title="Card Title"
          description="This is the card description with some text."
          imageUrl="https://wallpapers.com/images/hd/vue-js-programming-nmw3bm4aj9o70p7k.jpg"
        >
          <!-- <p class="text-gray-500">This is additional content in the default slot.</p> -->
          <template #footer>
            <button>Action Button</button>
          </template>
        </Card>

        <Card title="Card Title">
          <p class="text-gray-500 dark:text-gray-300">
            This is card description in the default slot
          </p>
          <div>🤖🤖 Holla</div>

          <template #footer>
            <button>Action Button</button>
          </template>
        </Card>
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
