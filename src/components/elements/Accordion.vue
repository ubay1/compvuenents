<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { accordionVariant } from '@/utils/tw-variants/components/accordion'

interface AccordionItem {
  title: string
  description?: string
  isOpen: boolean
}

const props = defineProps<{
  items: Omit<AccordionItem, 'isOpen'>[]
}>()

const items = ref<AccordionItem[]>(props.items.map((item) => ({ ...item, isOpen: false })))

const toggleAccordion = (index: number) => {
  items.value[index].isOpen = !items.value[index].isOpen
}

const onEnter = (el: any) => {
  const element = el as HTMLElement
  element.style.height = 'auto'
  const height = getComputedStyle(element).height
  element.style.height = '0'
  setTimeout(() => {
    element.style.height = height
  }, 0)
}

const onAfterEnter = (el: any) => {
  el.style.height = 'auto'
}

const onLeave = (el: any) => {
  const element = el as HTMLElement
  element.style.height = getComputedStyle(element).height
  setTimeout(() => {
    element.style.height = '0'
  }, 0)
}
</script>

<template>
  <div class="w-full max-w-md mx-auto">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="border-b border-gray-200 dark:border-gray-700"
    >
      <button
        @click="toggleAccordion(index)"
        :class="
          accordionVariant({
            withDescription: !!item.description,
          }).buttonToggle()
        "
      >
        <div class="flex flex-col gap-1">
          <span class="font-medium text-gray-700 dark:text-gray-200">{{ item.title }}</span>
          <span v-if="item.description" class="text-xs text-gray-400 dark:text-gry-700">{{
            item.description
          }}</span>
        </div>
        <span :class="accordionVariant({ open: item.isOpen }).icon()">
          <svg
            class="w-5 h-5 text-gray-700 dark:text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </span>
      </button>
      <transition name="accordion" @enter="onEnter" @after-enter="onAfterEnter" @leave="onLeave">
        <div v-show="item.isOpen" class="px-0 overflow-hidden">
          <div class="pb-4 text-gray-600 dark:text-gray-300">
            <slot :name="`content-${index}`"></slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: height 0.3s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  height: 0;
}
</style>
