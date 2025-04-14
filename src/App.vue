<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/pages/Navbar.vue'
import Sidebar from '@/components/pages/Sidebar.vue'
import { appearance } from '@/utils/tw-variants/components/appearance'
import { Icon } from '@iconify/vue/dist/iconify.js'

const isDark = useDark()
</script>

<template>
  <div :class="['min-h-screen', appearance({ appearance: isDark ? 'dark' : 'light' })]">
    <!-- Navbar -->
    <Navbar />

    <!-- menu sidebar small screen -->
    <button
      class="flex items-center gap-2 md:hidden sm:mx-6 p-2 mx-4 my-2 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
      aria-label="Menu sidebar"
    >
      <!-- @click="toggleTheme()" -->
      <Icon icon="mdi:format-list-bulleted" color="dark:text-white" class="text-xl" />
      Menu
    </button>

    <!-- Sidebar & Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row">
        <!-- Sidebar -->
        <Sidebar class="hidden md:flex py-6" />

        <!-- Main Content -->
        <main class="w-full overflow-hidden md:ml-4 py-6">
          <RouterView />
        </main>
      </div>
    </div>

    <!-- Footer -->
    <!-- <Footer /> -->
  </div>
</template>

<style></style>
