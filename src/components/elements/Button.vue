<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { buttonVariant } from '@/utils/tw-variants/components/button'

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
</script>

<template>
  <button
    :class="
      buttonVariant({
        block: props.block,
        rounded: props.rounded,
        size: props.size,
        color_fill:
          props.disabled && props.type === 'fill'
            ? 'disabled'
            : props.type === 'fill'
              ? props.variant
              : 'notfound',
        color_outline:
          props.disabled && props.type === 'outline'
            ? 'disabled'
            : props.type === 'outline'
              ? props.variant
              : 'notfound',
      })
    "
    :disabled="disabled"
    @click="emit('click')"
  >
    <slot></slot>
  </button>
</template>
