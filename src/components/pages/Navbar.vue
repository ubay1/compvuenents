<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const isDark = useDark()
const toggleTheme = useToggle(isDark)
</script>

<template>
  <header class="shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex gap-8">
          <div class="flex-shrink-0 flex items-center">
            <h1 class="text-xl font-bold text-green-600">CompVuenents</h1>
          </div>
          <nav class="hidden sm:ml-6 sm:flex sm:space-x-2">
            <RouterLink
              to="/"
              :class="[
                ' inline-flex items-center px-1 pt-1 text-sm',
                {
                  'border-green-600 text-green-600 font-semibold': route.path === '/',
                  'border-transparent text-gray-500 dark:text-gray-300': route.path !== '/',
                },
              ]"
            >
              Home
            </RouterLink>
            <RouterLink
              to="/playground"
              :class="[
                ' inline-flex items-center px-1 pt-1 text-sm',
                {
                  'border-green-600 text-green-600 font-semibold': route.path === '/playground',
                  'border-transparent text-gray-500 dark:text-gray-300':
                    route.path !== '/playground',
                },
              ]"
            >
              Playground
            </RouterLink>
          </nav>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <!-- Theme Toggle Button -->
          <button
            @click="toggleTheme()"
            class="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <!-- Sun icon (light mode) -->
            <svg
              v-if="isDark"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clip-rule="evenodd"
              />
            </svg>
            <!-- Moon icon (dark mode) -->
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
