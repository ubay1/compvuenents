<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import dayjs from 'dayjs'
import { useDark, useWindowSize } from '@vueuse/core'
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue'
import type { IPropsCalendar, IPropsDatePicker } from '@/types/components'
import Calendar from './Calendar.vue'
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue/dist/iconify.js'

const { width: widthWindow } = useWindowSize()
const emit = defineEmits(['change', 'showhide'])
const {
  disabledMinDate,
  disabledMaxDate,
  disabledWeekend,
  disabledOnlySunday,
  disabledOnlySaturday,
  disabledDates,
  disabled,
  theme,
  initialValue,
  withRange,
  // props datepicker
  showIconCalendar = true,
  colorIconCalendar = '#556167',
  prependIcon = false,
  label = 'Pilih tanggal',
  placeholder = 'Pilih tanggal',
  formatShowDate = 'DD MMMM YYYY',
  defaultView,
  isFloating,
  isRequired,
  isFlipList,
  positionCalendar,
} = defineProps<IPropsCalendar & IPropsDatePicker>()

const isDark = useDark()

const selectedDate = ref<string>('') // Menyimpan tanggal terpilih
const showCalendar = ref(false) // Kontrol visibilitas dropdown kalender
const inputRef = ref(null) // Untuk menangkap klik di luar
// Element referensi untuk posisi floating
const referenceEl = ref(null)
const calendarRef = ref(null)

const BOTTOM_MARGIN = 100 // Ganti ini sesuai kebutuhan

const getPlacement = () => {
  if (!referenceEl.value) return 'bottom-start'

  const rect = (referenceEl.value as any).getBoundingClientRect()
  const distanceToBottom = window.innerHeight - rect.bottom

  return distanceToBottom < BOTTOM_MARGIN ? 'top-start' : 'bottom-start'
}
const getFlipList = computed(() =>
  isFlipList ? [flip(), shift(), offset(8)] : [shift(), offset(8)],
)
// Hitung posisi floating
const { floatingStyles } = useFloating(referenceEl, calendarRef, {
  placement: positionCalendar, // Gunakan hasil dari fungsi di atas
  middleware: getFlipList.value,
  whileElementsMounted: autoUpdate,
})

watch(
  () => initialValue,
  (newVal) => {
    // console.log('init value datepicker v3 = ', newVal)
    selectedDate.value = newVal as string
  },
  { immediate: true },
)

// Saat user memilih tanggal di kalender
const handleDateSelect = (date: any) => {
  if (withRange) {
    selectedDate.value = `${dayjs(date.startDate).format(formatShowDate)} - ${dayjs(
      date.endDate,
    ).format(formatShowDate)}`
  } else {
    selectedDate.value = date
  }
  showCalendar.value = false
  emit('change', selectedDate.value)
  emit('showhide', showCalendar.value)
}

const showHideCalendar = () => {
  if (!disabled) {
    showCalendar.value = !showCalendar.value
    emit('showhide', showCalendar.value)
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (
    calendarRef.value &&
    !(calendarRef.value as any).contains(event.target as Node) &&
    inputRef.value &&
    !(inputRef.value as any).contains(event.target as Node)
  ) {
    showCalendar.value = false
  }
}

const dateRange = () => {
  const [startDateStr, endDateStr] = selectedDate.value.split(' - ')

  const formatDate = (dateStr: string) => {
    const parts = dateStr.replace(/\//g, '-').split('-')
    return {
      fullDate: `${parts[2]}-${parts[1]}-${parts[0]}`,
      onlyDate: parts[0],
    }
  }

  const { fullDate: startDate, onlyDate: startOnlyDate } = formatDate(startDateStr)
  const { fullDate: endDate, onlyDate: endOnlyDate } = formatDate(endDateStr)

  return {
    startDate,
    startOnlyDate,
    endDate,
    endOnlyDate,
  }
}

const getLabel = computed(() => {
  if (selectedDate.value && !withRange) {
    return dayjs(selectedDate.value).format(formatShowDate)
  }
  if (selectedDate.value && withRange) {
    return selectedDate.value
  }
  return placeholder
})

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<template>
  <div ref="referenceEl" class="relative">
    <!-- Input yang menampilkan tanggal -->
    <div ref="inputRef" @click="showHideCalendar()">
      <label class="block text-[14px] mb-1 font-medium text-gray-700 dark:text-white">
        <span v-if="isRequired" class="text-red-500">*</span> {{ label }}
      </label>
      <div
        :style="[`border-color: ${isDark ? 'none' : showCalendar ? theme : '#d1d5dc'}`]"
        :class="[
          'border border-solid dark:border-gray-500 rounded-md px-3 h-[2.4rem] cursor-pointer flex items-center bg-white dark:bg-gray-800',
          {
            'bg-gray-200 cursor-default': disabled,
            'flex-row-reverse justify-end gap-2': prependIcon,
            'justify-between': !prependIcon,
          },
        ]"
      >
        <span
          :class="[
            'text-[14px] dark:text-white',
            {
              'text-black': selectedDate,
              'text-[#CACCCF]': !selectedDate,
              'text-gray-500 text-[16px]': disabled,
            },
          ]"
        >
          {{ getLabel }}
        </span>
        <Icon
          v-if="showIconCalendar"
          icon="uil:calendar"
          size="20"
          :color="isDark ? '#fff' : colorIconCalendar"
        />
      </div>
    </div>

    <!-- Dropdown Kalender -->
    <div
      v-if="showCalendar"
      ref="calendarRef"
      class="absolute z-[1000] bg-white shadow border border-gray-100 rounded-md"
      :style="[isFloating ? floatingStyles : '', { width: widthWindow < 500 ? '100%' : '320px' }]"
      @click.stop
    >
      <Calendar
        :theme="theme"
        :initial-value="
          !withRange && selectedDate ? selectedDate : withRange && selectedDate ? dateRange() : ''
        "
        :default-view="defaultView"
        :disabled-weekend="disabledWeekend"
        :disabled-only-sunday="disabledOnlySunday"
        :disabled-only-saturday="disabledOnlySaturday"
        :disabled-dates="disabledDates"
        :disabled-min-date="disabledMinDate"
        :disabled-max-date="disabledMaxDate"
        :with-range="withRange"
        @on-selected-date="handleDateSelect"
      />
    </div>
  </div>
</template>

<style scoped>
/* Tambahkan styling jika diperlukan */
</style>
