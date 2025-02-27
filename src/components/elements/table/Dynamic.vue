<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, computed } from 'vue'

interface Column {
  key: string
  label: string
}

interface TableItem {
  [key: string]: any
}

const props = withDefaults(
  defineProps<{
    data: TableItem[]
    columns: Column[]
    defaultSort?: string
    defaultDirection?: 'asc' | 'desc'
  }>(),
  {
    defaultSort: '',
    defaultDirection: 'asc',
  },
)

// Pagination
const currentPage = ref<number>(1)
const pageSize = ref(10)
const pageSizeOptions = [5, 10, 25, 50, 100]

// Sorting
const sortColumn = ref(props.defaultSort || props.columns[0]?.key)
const sortDirection = ref<'asc' | 'desc'>(props.defaultDirection || 'asc')

// Searching
const searchQuery = ref('')

// Filter data based on search
const filteredData = computed(() => {
  if (!searchQuery.value.trim()) {
    return props.data
  }

  const query = searchQuery.value.toLowerCase()
  return props.data.filter((item) => {
    return props.columns.some((column) => {
      const value = item[column.key]
      return value != null && value.toString().toLowerCase().includes(query)
    })
  })
})

// Sort data
const sortedData = computed(() => {
  return [...filteredData.value].sort((a, b) => {
    const aValue = a[sortColumn.value]
    const bValue = b[sortColumn.value]

    if (aValue === bValue) return 0

    const comparison = aValue < bValue ? -1 : 1
    return sortDirection.value === 'asc' ? comparison : -comparison
  })
})

// Calculate total pages
const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredData.value.length / pageSize.value))
})

// Ensure current page is valid
const validCurrentPage = computed(() => {
  return Math.min(currentPage.value, totalPages.value)
})

// Calculate visible page range
const visiblePageNumbers = computed(() => {
  const pages: number[] = []
  const maxVisiblePages = 5

  let startPage = Math.max(1, validCurrentPage.value - Math.floor(maxVisiblePages / 2))
  let endPage = startPage + maxVisiblePages - 1

  if (endPage > totalPages.value) {
    endPage = totalPages.value
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return pages
})

// Get paginated data
const paginatedAndFilteredData = computed(() => {
  const startIdx = (validCurrentPage.value - 1) * pageSize.value
  const endIdx = Math.min(startIdx + pageSize.value, sortedData.value.length)
  return sortedData.value.slice(startIdx, endIdx)
})

// Calculate indices for display
const startIndex = computed(() => {
  return (validCurrentPage.value - 1) * pageSize.value
})

const endIndex = computed(() => {
  return Math.min(startIndex.value + pageSize.value, filteredData.value.length)
})

// Sort function
const sortByColumn = (column: string) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}
</script>

<template>
  <div class="w-full overflow-x-auto">
    <div class="flex items-center justify-between mb-4">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>
      <div>
        <select
          v-model="pageSize"
          class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option v-for="size in pageSizeOptions" :key="size" :value="size">
            {{ size }} per page
          </option>
        </select>
      </div>
    </div>

    <table class="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
      <thead class="bg-gray-100">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            @click="sortByColumn(column.key)"
            class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
          >
            {{ column.label }}
            <span v-if="sortColumn === column.key">
              {{ sortDirection === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="(item, index) in paginatedAndFilteredData" :key="index" class="hover:bg-gray-50">
          <td
            v-for="column in columns"
            :key="column.key"
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
          >
            {{ item[column.key] }}
          </td>
        </tr>
        <tr v-if="paginatedAndFilteredData.length === 0">
          <td :colspan="columns.length" class="px-6 py-4 text-center text-sm text-gray-500">
            No data available
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex items-center justify-between mt-4">
      <div class="text-sm text-gray-700">
        Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredData.length }} entries
      </div>
      <div class="flex space-x-2">
        <button
          @click="currentPage = 1"
          :disabled="currentPage === 1"
          class="px-3 py-1 rounded border"
          :class="
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-blue-600 hover:bg-blue-50'
          "
        >
          First
        </button>
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-3 py-1 rounded border"
          :class="
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-blue-600 hover:bg-blue-50'
          "
        >
          Prev
        </button>
        <button
          v-for="page in visiblePageNumbers"
          :key="page"
          @click="currentPage = page"
          class="px-3 py-1 rounded border"
          :class="
            currentPage === page
              ? 'bg-blue-600 text-white'
              : 'bg-white text-blue-600 hover:bg-blue-50'
          "
        >
          {{ page }}
        </button>
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 rounded border"
          :class="
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-blue-600 hover:bg-blue-50'
          "
        >
          Next
        </button>
        <button
          @click="currentPage = totalPages"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 rounded border"
          :class="
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-blue-600 hover:bg-blue-50'
          "
        >
          Last
        </button>
      </div>
    </div>
  </div>
</template>
