<script setup lang="ts">
interface CardProps {
  title?: string
  description?: string
  imageUrl?: string
  imageAlt?: string
  click?: boolean
}

const props = withDefaults(defineProps<CardProps>(), {
  title: '',
  description: '',
  imageUrl: '',
  imageAlt: 'Card image',
  click: false,
})
</script>

<template>
  <div
    class="overflow-hidden rounded-lg transition-all duration-200 bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/30"
    :class="{
      'cursor-pointer hover:shadow-lg dark:hover:shadow-gray-900/40 hover:-translate-y-1':
        props.click,
    }"
  >
    <div v-if="props.imageUrl" class="w-full h-48 overflow-hidden">
      <img :src="props.imageUrl" :alt="props.imageAlt" class="object-cover w-full h-full" />
    </div>
    <div class="p-4">
      <h3
        v-if="props.title"
        class="mt-0 mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100"
      >
        {{ props.title }}
      </h3>
      <p
        v-if="props.description"
        class="mt-0 mb-4 text-gray-600 dark:text-gray-300 leading-relaxed"
      >
        {{ props.description }}
      </p>
      <slot></slot>
      <div v-if="$slots.footer" class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
