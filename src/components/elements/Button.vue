<script setup lang="ts">
import { computed } from 'vue'
import { getTextColorFromRgb } from '@/utils/tailwind-variants'

type ButtonType = 'fill' | 'outline'
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'warning' | 'info'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface Props {
  type?: ButtonType
  variant?: ButtonVariant
  size?: ButtonSize
  rounded?: boolean
  block?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'fill',
  variant: 'primary',
  size: 'md',
  rounded: false,
  block: false,
  disabled: false,
})

const emit = defineEmits(['click'])

// Classes for light mode and dark mode
const classes = {
  fill: {
    primary: `bg-indigo-600 hover:bg-indigo-700 border border-indigo-600 ${getTextColorFromRgb('#615fff') === '#000' ? 'text-[#000]' : 'text-[#fff]'} dark:bg-indigo-700 dark:hover:bg-indigo-800 dark:border-indigo-700`,
    secondary: `bg-gray-500 hover:bg-gray-600 border border-gray-500 ${getTextColorFromRgb('#6a7282') === '#000' ? 'text-[#000]' : 'text-[#fff]'} dark:bg-gray-600 dark:hover:bg-gray-700 dark:border-gray-600`,
    danger: `bg-red-500 hover:bg-red-600 border border-red-500 ${getTextColorFromRgb('#fb2c36') === '#000' ? 'text-[#000]' : 'text-[#fff]'} dark:bg-red-600 dark:hover:bg-red-700 dark:border-red-600`,
    warning: `bg-yellow-500 hover:bg-yellow-600 border border-yellow-500 ${getTextColorFromRgb('#efb100') === '#000' ? 'text-[#000]' : 'text-[#fff]'} dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:border-yellow-600`,
    info: `bg-cyan-500 hover:bg-cyan-600 border border-cyan-500 ${getTextColorFromRgb('#00b8db') === '#000' ? 'text-[#000]' : 'text-[#fff]'} dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:border-cyan-600`,
    disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400',
  },
  outline: {
    primary:
      'bg-transparent hover:bg-indigo-50 text-indigo-600 border border-indigo-600 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-indigo-900/30',
    secondary:
      'bg-transparent hover:bg-gray-50 text-gray-600 border border-gray-500 dark:text-gray-300 dark:border-gray-400 dark:hover:bg-gray-800',
    danger:
      'bg-transparent hover:bg-red-50 text-red-600 border border-red-500 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/30',
    warning:
      'bg-transparent hover:bg-yellow-50 text-yellow-600 border border-yellow-500 dark:text-yellow-400 dark:border-yellow-400 dark:hover:bg-yellow-900/30',
    info: 'bg-transparent hover:bg-cyan-50 text-cyan-600 border border-cyan-500 dark:text-cyan-400 dark:border-cyan-400 dark:hover:bg-cyan-900/30',
    disabled:
      'bg-transparent text-gray-300 border border-gray-200 cursor-not-allowed dark:text-gray-600 dark:border-gray-700',
  },
}

const buttonClasses = computed(() => {
  return props.disabled ? classes[props.type]['disabled'] : classes[props.type][props.variant]
})
</script>

<template>
  <button
    :class="[
      buttonClasses,
      {
        'rounded-full': rounded,
        'w-full': block,
        'h-8 px-2 text-sm': size === 'sm',
        'h-12 px-4 text-base': size === 'md',
        'h-16 px-6 text-lg': size === 'lg',
      },
      'transition-colors duration-200 ease-in-out',
    ]"
    :disabled="disabled"
    @click="emit('click')"
  >
    <slot></slot>
  </button>
</template>
