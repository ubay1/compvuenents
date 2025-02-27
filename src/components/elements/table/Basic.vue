<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
export interface TableColumn {
  key: string
  label: string
}

interface TableItem {
  [key: string]: any
}

const props = defineProps<{
  columns: TableColumn[]
  data: TableItem[]
}>()
</script>

<template>
  <div class="mt-4 overflow-x-auto">
    <table class="min-w-full divide-y dark:divide-gray-700 divide-gray-200">
      <thead class="dark:bg-gray-800 bg-gray-50">
        <tr>
          <th
            v-for="column in props.columns"
            :key="column.key"
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider dark:text-gray-30 text-gray-500"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
        <tr v-for="(item, index) in props.data" :key="index">
          <td
            v-for="column in columns"
            :key="column.key"
            class="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-300 text-gray-900"
          >
            {{ item[column.key] }}
          </td>
        </tr>
        <tr v-if="props.data.length === 0">
          <td :colspan="columns.length" class="px-6 py-4 text-center text-sm text-gray-500">
            No data available
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
