<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue/dist/iconify.js'

// const route = useRoute()
const isDark = useDark()
const toggleTheme = useToggle(isDark)
</script>

<template>
  <header class="border-b border-gray-200 dark:border-b-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex gap-8">
          <div class="flex-shrink-0 flex items-center">
            <h1 class="text-xl font-bold text-green-600">
              <RouterLink to="/"> CompVuenents </RouterLink>
            </h1>
          </div>
        </div>
        <div class="ml-6 flex items-center gap-2">
          <a
            href="https://github.com/ubay1/compvuenents/tree/main/src/components/elements"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon="mdi:github" class="text-2xl" />
          </a>
          <!-- Theme Toggle Button -->
          <button
            class="bg-transparent border-0 p-0 transition-colors"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleTheme()"
          >
            <Icon v-if="!isDark" icon="ph:moon-fill" class="text-2xl text-gray-800" />
            <Icon v-if="isDark" icon="ph:sun-fill" class="text-2xl text-white" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
