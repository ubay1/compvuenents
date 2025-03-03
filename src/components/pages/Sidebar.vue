<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const components = [
  {
    name: 'Accordion',
    path: '/components/accordion',
  },
  {
    name: 'Alert',
    path: '/components/alert',
  },
  {
    name: 'Button',
    path: '/components/button',
  },
  {
    name: 'Calendar',
    path: '/components/calendar',
  },
  {
    name: 'Card',
    path: '/components/card',
  },
  {
    name: 'Modal',
    path: '/components/modal',
  },
]

onMounted(() => {
  console.log(route)
})
</script>

<template>
  <aside
    class="w-full min-h-screen md:w-44 md:flex-shrink-0 pr-4 border-r border-gray-200 dark:border-gray-700"
  >
    <div class="sticky top-6">
      <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
        Komponen
      </h3>
      <div class="mt-2 space-y-1">
        <RouterLink
          v-for="item in components"
          :key="item.path"
          :to="item.path"
          :class="[
            'px-2 py-1 rounded block',
            {
              'text-green-600 font-medium': route.path === item.path,
              'text-gray-400 dark:text-gray-500 hover:text-green-600 hover:bg-gray-100 dark:hover:bg-gray-800':
                route.path !== item.path,
            },
          ]"
        >
          {{ item.name }}
        </RouterLink>
      </div>
    </div>
  </aside>
</template>
