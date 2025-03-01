<script setup lang="ts">
import { watch } from 'vue'

// Props untuk mengontrol modal dari luar
const props = withDefaults(
  defineProps<{
    isOpen: boolean
    transitionType?: 'fade' | 'slide' | 'zoom'
    title?: string
    message?: string
    bgBlur?: boolean
  }>(),
  {
    transitionType: 'fade',
    bgBlur: false,
  },
)

// Emit untuk memberi tahu parent ketika modal ditutup
const emit = defineEmits(['close'])

watch(
  () => props.isOpen,
  (value) => {
    if (value) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  },
)

// Fungsi untuk menutup modal
const closeModal = () => {
  emit('close')
}
</script>

<template>
  <!-- Overlay -->
  <transition name="fade">
    <div
      v-if="isOpen"
      :class="[
        'fixed inset-0 bg-black/50 bg-opacity-10 z-40',
        {
          'backdrop-blur-lg': props.bgBlur,
        },
      ]"
      @click="closeModal"
    ></div>
  </transition>

  <!-- Modal -->
  <transition :name="props.transitionType">
    <div v-if="props.isOpen" class="fixed inset-0 flex items-center justify-center z-50 py-8">
      <div
        class="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 pt-4 w-[90%] md:w-1/2 max-h-[90vh] overflow-y-auto"
      >
        <div class="flex flex-col">
          <strong v-if="props.title" class="mr-1 mb-4">{{ props.title }}</strong>
          <p class="">{{ props.message }}</p>
        </div>
        <slot></slot>
        <button
          class="absolute top-2.5 right-3 bg-transparent border-none text-2xl cursor-pointer"
          @click="emit('close')"
        >
          ×
        </button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
/* Transisi Fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Transisi Slide */
.slide-enter-active,
.slide-leave-active {
  transition:
    transform 0.3s,
    opacity 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

/* Transisi Zoom */
.zoom-enter-active,
.zoom-leave-active {
  transition:
    transform 0.3s,
    opacity 0.3s;
}

.zoom-enter-from,
.zoom-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>
