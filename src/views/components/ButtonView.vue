<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import Button, { type ButtonVariant, type ButtonSize } from '@/components/elements/Button.vue'
import BasicTable, { type TableColumn } from '@/components/elements/table/Basic.vue'

const variantsButton: ButtonVariant[] = ['primary', 'secondary', 'danger', 'warning', 'info']
const sizeButton: ButtonSize[] = ['sm', 'md', 'lg']

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
    default: 'fill',
    value: 'fill/outline',
  },
  {
    name: 'variant',
    type: 'String',
    default: 'primary',
    value: 'primary,secondary, danger,success',
  },
  {
    name: 'size',
    type: 'String',
    default: 'md',
    value: 'sm, md, lg',
  },
  {
    name: 'rounded',
    type: 'Boolean',
    default: 'false',
    value: 'true/false',
  },
  {
    name: 'block',
    type: 'Boolean',
    default: 'false',
    value: 'true/false',
  },
  {
    name: 'disabled',
    type: 'Boolean',
    default: 'false',
    value: 'true/false',
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
    description: 'Event yang akan dijalankan ketika button diklik.',
  },
]
</script>

<template>
  <div id="button" class="pb-12 w-full">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-300">Button</h3>
    <p class="mt-2 text-gray-600 dark:text-gray-500">
      Komponen button yang dapat dikustomisasi sesuai kebutuhan.
    </p>

    <!-- Example -->
    <div class="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-[0px_4px_16px_0px_#00000014]">
      <div class="mt-4 flex flex-col flex-wrap gap-4">
        <div class="flex flex-wrap gap-2">
          <Button
            v-for="item in variantsButton"
            :key="item"
            type="fill"
            size="md"
            :block="false"
            :rounded="false"
            :variant="item"
            :disabled="false"
            @click="() => console.log('clicked')"
          >
            Button Fill
          </Button>
        </div>

        <div class="flex flex-wrap gap-2">
          <Button
            v-for="item in variantsButton"
            :key="item"
            type="outline"
            size="md"
            :block="false"
            :rounded="false"
            :variant="item"
            :disabled="false"
            @click="() => console.log('clicked')"
          >
            Button Outline
          </Button>
        </div>

        <Button
          :block="true"
          :rounded="false"
          :disabled="false"
          size="md"
          type="outline"
          variant="primary"
          @click="() => console.log('clicked')"
        >
          Button Block
        </Button>

        <div class="flex flex-wrap gap-2">
          <Button
            v-for="item in sizeButton"
            :key="item"
            type="fill"
            variant="info"
            :size="item"
            :block="false"
            :rounded="false"
            :disabled="false"
            @click="() => console.log('clicked')"
          >
            Button Size "{{ item }}"
          </Button>
        </div>
        <div class="flex flex-wrap gap-2">
          <Button
            :block="false"
            :rounded="true"
            :disabled="false"
            size="md"
            type="outline"
            variant="primary"
            @click="() => console.log('clicked')"
          >
            Button Rounded
          </Button>
          <Button
            :block="false"
            :rounded="true"
            :disabled="false"
            size="md"
            type="fill"
            variant="primary"
            class="rounded-md"
            @click="() => console.log('clicked')"
          >
            Button Rounded Custom
          </Button>
        </div>

        <div class="flex flex-wrap gap-2">
          <Button
            :block="false"
            :rounded="false"
            :disabled="true"
            size="md"
            type="outline"
            variant="primary"
            @click="() => console.log('clicked')"
          >
            Button Outline Disabled
          </Button>
          <Button
            :block="false"
            :rounded="false"
            :disabled="true"
            size="md"
            type="fill"
            variant="primary"
            @click="() => console.log('clicked')"
          >
            Button Fill Disabled
          </Button>
        </div>
      </div>
    </div>

    <!-- Usage -->
    <div class="mt-6">
      <h4 class="text-lg font-medium text-gray-900 dark:text-gray-300">Penggunaan</h4>
      <div class="mt-4 bg-gray-800 rounded-md p-4">
        <pre class="text-gray-200 overflow-x-auto">
<code>&lt;Button
  :block="false"
  :rounded="false"
  :disabled="true"
  size="md"
  type="fill"
  variant="primary"
  @click="() => console.log('clicked')"
&gt;
  Submit
&lt;/Button&gt;</code>
</pre>
      </div>
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
