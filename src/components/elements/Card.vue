<script setup lang="ts">
import { cardVariant } from '@/utils/tw-variants/components/card'

const { base, wrapperImg, img, titleClass, descClass, footer } = cardVariant()

interface CardProps {
  title?: string
  description?: string
  imageUrl?: string
  imageAlt?: string
}

const props = withDefaults(defineProps<CardProps>(), {
  title: '',
  description: '',
  imageUrl: '',
  imageAlt: 'Card image',
})
</script>

<template>
  <div :class="base()">
    <div v-if="props.imageUrl" :class="wrapperImg()">
      <img :src="props.imageUrl" :alt="props.imageAlt" :class="img()" />
    </div>
    <div class="p-4">
      <h3 v-if="props.title" :class="titleClass()">
        {{ props.title }}
      </h3>
      <p v-if="props.description" :class="descClass()">
        {{ props.description }}
      </p>
      <slot></slot>
      <div v-if="$slots.footer" :class="footer()">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
