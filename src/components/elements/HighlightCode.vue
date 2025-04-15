<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark-reasonable.css'

const props = withDefaults(defineProps<{ language: string }>(), {
  language: 'javascript',
})

const codeBlock = ref<HTMLElement | null>(null)
const copied = ref(false)

// Fungsi untuk menyalin kode
const copyCode = () => {
  if (codeBlock.value) {
    const text = codeBlock.value.textContent || ''
    navigator.clipboard.writeText(text).then(() => {
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    })
  }
}

// Fungsi untuk highlight kode
const highlightCode = () => {
  if (codeBlock.value) {
    hljs.highlightElement(codeBlock.value)
  }
}

onMounted(() => {
  highlightCode()
})

// Watch untuk jika kode diubah
watch(
  () => props.language,
  () => {
    highlightCode()
  },
)
</script>

<template>
  <div class="overflow-hidden relative rounded-lg shadow-md my-4">
    <div class="flex justify-start items-center bg-[#1e2938] py-2 px-4 text-gray-300">
      <span class="text-xs uppercase">{{ language }}</span>
      <button
        @click="copyCode"
        class="absolute top-2 right-2 text-xs py-1 px-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
        :class="{ 'bg-green-800 text-white hover:bg-green-800': copied }"
      >
        {{ copied ? 'Tersalin!' : 'Salin' }}
      </button>
    </div>
    <pre
      class="m-0 overflow-x-auto font-mono text-sm leading-6"
      :class="`language-${language}`"
    ><code ref="codeBlock" class="pt-5 pb-5 block"><slot></slot></code></pre>
  </div>
</template>

<style></style>
