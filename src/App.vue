<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/pages/Navbar.vue'
import Sidebar from '@/components/pages/Sidebar.vue'
import { appearance } from '@/utils/tw-variants/components/appearance'

const isDark = useDark()
</script>

<template>
  <div :class="['min-h-screen', appearance({ appearance: isDark ? 'dark' : 'light' })]">
    <!-- Navbar -->
    <Navbar />

    <!-- Sidebar & Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row py-6">
        <!-- Sidebar -->
        <Sidebar />

        <!-- Main Content -->
        <main class="w-full overflow-hidden md:ml-8">
          <RouterView />
        </main>
      </div>
    </div>

    <!-- Footer -->
    <!-- <Footer /> -->
  </div>
</template>

<style></style>
