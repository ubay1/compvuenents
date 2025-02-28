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
    name: '-',
    description: '-',
  },
]
</script>

<template>
  <div id="button" class="pb-12 w-full">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-300">Card</h3>
    <p class="mt-2 text-gray-600 dark:text-gray-500">
      Komponen card untuk menampilkan konten dalam container yang terisolasi.
    </p>

    <!-- Example -->
    <div class="mt-6 mx-1 bg-white p-6 rounded-lg shadow-gmail">
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
            This is card description in the default slot. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Iure ducimus ipsa pariatur quod vitae omnis, vel qui reprehenderit
            ipsum eius dolorum adipisci minus excepturi officiis deleniti. Debitis ullam magnam
            dignissimos?
          </p>
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
        <pre><code>&lt;Card
  title="Card Title"
  description="This is the card description with some text."
  imageUrl="https://wallpapers.com/images/hd/vue-js-programming-nmw3bm4aj9o70p7k.jpg"
  :clickable="true"
&gt;
  &lt;template #footer&gt;
    &lt;button&gt;Action Button&lt;/button&gt;
  &lt;/template&gt;
&lt;/Card&gt;</code>
  </pre>
      </HighlightCode>
    </div>

    <!-- Props -->
    <div class="mt-6">
      <h4 class="text-lg font-medium text-gray-900 dark:text-gray-300">Props</h4>
      <BasicTable :columns="columnsProps" :data="dataProps" />
    </div>

    <!-- Slots -->
    <div class="mt-6">
      <h4 class="text-lg font-medium text-gray-900">Slots</h4>
      <BasicTable :columns="columnsEvents" :data="dataEvents" />
    </div>
  </div>
</template>
