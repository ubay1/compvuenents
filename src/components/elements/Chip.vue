<script setup lang="ts">
import { chipVariant } from '@/utils/tw-variants/components/chip'

const props = defineProps<{
  color: 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'disabled'
  type: 'fill' | 'outline'
  label: string
}>()
</script>

<template>
  <span
    :class="[
      chipVariant.base,
      type === 'fill'
        ? chipVariant.variants.color_fill[props.color]
        : chipVariant.variants.color_outline_bg_soft[props.color],
    ]"
  >
    {{ props.label }}
  </span>
</template>
