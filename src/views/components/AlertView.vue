<script setup lang="ts">
import { ref } from 'vue'
import BasicTable, { type TableColumn } from '@/components/elements/table/Basic.vue'
import Alert from '@/components/elements/Alert.vue'
import Button from '@/components/elements/Button.vue'
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
    name: 'click',
    description: 'Event yang akan dijalankan ketika card diklik.',
  },
]

const showAlert = ref(true)
</script>

<template>
  <div id="button" class="pb-12 w-full">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-300">Alert</h3>
    <p class="mt-2 text-gray-600 dark:text-gray-500">
      Komponen alert untuk menampilkan notifikasi sukses,info,warning,error pada web.
    </p>

    <!-- Example -->
    <div class="mt-6 mx-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-gmail">
      <div class="mt-4 flex flex-col flex-wrap gap-4">
        <Alert
          type="info"
          title="Lorem!"
          message="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos cumque, quae ipsum totam cum id placeat inventore nisi porro eos mollitia praesentium aperiam eligendi vitae vel? Quia temporibus fuga dolore!"
          :visible="showAlert"
          @close="showAlert = false"
        />

        <Button variant="primary" :block="true" class="rounded-md" @click="showAlert = true"
          >Tampilkan Alert</Button
        >
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
