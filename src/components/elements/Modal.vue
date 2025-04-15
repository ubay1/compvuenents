<script setup lang="ts">
import { watch } from 'vue'
import { modalVariant } from '@/utils/tw-variants/components/modal'

const { backdrop, wrapperContent, cardContent, buttonX } = modalVariant()

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

const closeModal = () => emit('close')
</script>

<template>
  <!-- Overlay -->
  <transition name="fade">
    <div v-if="isOpen" :class="backdrop({ withBgBlur: props.bgBlur })" @click="closeModal()"></div>
  </transition>

  <!-- Modal -->
  <transition :name="props.transitionType">
    <div v-if="props.isOpen" :class="wrapperContent()">
      <div :class="cardContent()">
        <div class="flex flex-col">
          <strong v-if="props.title" class="mr-1 mb-4">{{ props.title }}</strong>
          <p class="">{{ props.message }}</p>
        </div>
        <slot></slot>
        <button :class="buttonX()" @click="closeModal()">×</button>
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
