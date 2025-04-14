<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  disabled?: boolean
  label?: string
  color?: string // Hex code, misalnya: '#ff0000', '#00ff00'
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const toggle = () => {
  emit('update:modelValue', !props.modelValue)
}

// Style dinamis berdasarkan warna hex
const checkboxStyle = computed(() => ({
  backgroundColor: props.modelValue ? props.color || '#3b82f6' : 'transparent', // Default: biru Tailwind (#3b82f6)
  borderColor: props.modelValue ? props.color || '#3b82f6' : '#d1d5db', // Default border gray-300
}))
</script>

<template>
  <label
    :class="[
      'flex items-center space-x-2',
      { 'opacity-50 cursor-not-allowed': props.disabled, 'cursor-pointer': !props.disabled },
    ]"
  >
    <!-- Hidden input untuk binding -->
    <input
      type="checkbox"
      :disabled="props.disabled"
      class="peer hidden"
      :checked="modelValue"
      @change="toggle"
    />

    <!-- Custom styled checkbox -->
    <div class="w-5 h-5 border-2 rounded-md transition-all duration-200" :style="checkboxStyle">
      <svg
        v-if="modelValue"
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="3"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>

    <span v-if="label" class="text-gray-700 dark:text-gray-300">{{ label }}</span>
  </label>
</template>
