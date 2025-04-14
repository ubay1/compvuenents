<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import Navbar from '@/components/pages/Navbar.vue'
import Sidebar from '@/components/pages/Sidebar.vue'
import { appearance } from '@/utils/tw-variants/components/appearance'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { ref } from 'vue'
import components from './constants/menuSidebar'

const isDark = useDark()
const route = useRoute()

const showSidebarSmScreen = ref(false)
</script>

<template>
  <div :class="['min-h-screen', appearance({ appearance: isDark ? 'dark' : 'light' })]">
    <!-- Navbar -->
    <Navbar />

    <!-- menu sidebar small screen -->
    <section>
      <button
        class="flex items-center gap-2 md:hidden sm:mx-6 p-2 mx-4 my-2 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
        aria-label="Menu sidebar"
        @click="showSidebarSmScreen = !showSidebarSmScreen"
      >
        <Icon icon="mdi:format-list-bulleted" color="dark:text-white" class="text-xl" />
        Menu
      </button>

      <div v-if="showSidebarSmScreen">
        <div
          class="fixed z-20 top-0 left-0 w-screen h-screen bg-gray-800/50 backdrop-blur-lg"
          @click="showSidebarSmScreen = !showSidebarSmScreen"
        ></div>
        <div
          class="h-screen fixed top-0 z-30 left-0 w-full sm:w-[250px] bg-white dark:bg-gray-800 border-r dark:border-r-gray-700 space-y-1 p-4"
        >
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
    </section>

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
