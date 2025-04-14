<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useDark } from '@vueuse/core'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue/dist/iconify.js'
import Navbar from '@/components/pages/Navbar.vue'
import Sidebar from '@/components/pages/Sidebar.vue'
import { appearance } from '@/utils/tw-variants/components/appearance'
import components from './constants/menuSidebar'
import { modalVariant } from './utils/tw-variants/components/modal'

const isDark = useDark()
const route = useRoute()
const router = useRouter()

const { buttonX } = modalVariant()

const showSidebarSmScreen = ref(false)

const goto = (path: string) => {
  router.push(path)
  showSidebarSmScreen.value = false
}
</script>

<template>
  <div :class="['min-h-screen', appearance({ appearance: isDark ? 'dark' : 'light' })]">
    <!-- Navbar -->
    <Navbar />

    <!-- menu sidebar small screen -->
    <section>
      <button
        class="mt-4 flex items-center gap-2 md:hidden sm:mx-6 p-2 mx-4 my-2 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
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
        <button
          :class="[buttonX(), '!z-[1000] sm:hidden']"
          @click="showSidebarSmScreen = !showSidebarSmScreen"
        >
          ×
        </button>
        <div
          class="h-screen fixed top-0 z-30 left-0 w-full sm:w-[250px] bg-white dark:bg-gray-800 border-r dark:border-r-gray-700 space-y-1 p-4 py-8"
        >
          <button
            v-for="item in components"
            :key="item.path"
            :class="[
              'px-2 py-1 rounded block bg-transparent p-0 border-0',
              {
                'text-green-600 font-medium': route.path === item.path,
                'text-gray-400 dark:text-gray-500 hover:text-green-600 hover:bg-gray-100 dark:hover:bg-gray-800':
                  route.path !== item.path,
              },
            ]"
            @click="goto(item.path)"
          >
            {{ item.name }}
          </button>
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
