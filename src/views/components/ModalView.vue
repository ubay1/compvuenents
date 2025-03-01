<script setup lang="ts">
import { ref } from 'vue'
import BasicTable, { type TableColumn } from '@/components/elements/table/Basic.vue'
import Modal from '@/components/elements/Modal.vue'
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
    name: 'type',
    type: 'String',
    opsional: 'false',
    default: '',
    value: `info | success | warning | error`,
  },
  {
    name: 'title',
    type: 'String',
    opsional: 'false',
    default: '',
    value: '',
  },
  {
    name: 'message',
    type: 'String',
    opsional: 'false',
    default: '',
    value: '',
  },
  {
    name: 'visible',
    type: 'Boolean',
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
    name: 'close',
    description: 'Event yang dijalankan saat user klik icon X',
  },
]

// State untuk mengontrol modal
const isModalOpen = ref(false)

// Fungsi untuk membuka modal
const openModal = () => {
  isModalOpen.value = true
}

// Fungsi untuk menutup modal
const closeModal = () => {
  isModalOpen.value = false
}
</script>

<template>
  <div id="button" class="pb-12 w-full">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-300">Modal</h3>

    <!-- Example -->
    <div class="mt-6 mx-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-gmail">
      <div class="mt-4 flex flex-col flex-wrap gap-4">
        <!-- Komponen Modal -->
        <Modal
          :is-open="isModalOpen"
          transition-type="zoom"
          title="Lorem!"
          message="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos cumque, quae ipsum totam cum id placeat inventore nisi porro eos mollitia praesentium aperiam eligendi vitae vel? Quia temporibus fuga dolore! inventore nisi porro eos mollitia praesentium aperiam eligendi vitae vel? Quia temporibus fuga dolore!"
          :bg-blur="true"
          @close="closeModal"
        >
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos cumque, quae ipsum totam
            cum id placeat inventore nisi porro eos mollitia praesentium aperiam eligendi vitae vel?
            Quia temporibus fuga dolore! inventore nisi porro eos mollitia praesentium aperiam
            eligendi vitae vel? Quia temporibus fuga dolore!
          </p>
        </Modal>

        <Button variant="primary" :block="true" class="rounded-md" @click="openModal">
          Show Modal
        </Button>
      </div>
    </div>

    <!-- Usage -->
    <div class="mt-6">
      <h4 class="text-lg font-medium text-gray-900 dark:text-gray-300">Penggunaan</h4>
      <HighlightCode language="">
        <pre><code>&lt;Modal
  :is-open="isModalOpen"
  transition-type="slide"
  title="Lorem!"
  message="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos cumque, quae ipsum totam cum id placeat inventore nisi porro eos mollitia praesentium aperiam eligendi vitae vel? Quia temporibus fuga dolore!"
  :bg-blur="true"
  @close="closeModal"
/&gt;</code>
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
