<!-- eslint-disable security/detect-object-injection -->
<!-- eslint-disable no-alert -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable sonarjs/no-duplicate-string -->
<!-- eslint-disable sonarjs/prefer-single-boolean-return -->
<!-- eslint-disable @typescript-eslint/no-shadow -->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import type { IPropsCalendar } from '@/types/components'
import { checkDataIsNotEmpty } from '@/utils/validations'
import { getTextColorFromRgb } from '@/utils/color'

dayjs.locale('id')

const {
  disabledWeekend,
  disabledOnlySunday,
  disabledOnlySaturday,
  disabledDates,
  defaultView,
  dotActive,
  dotColor = '#00b8ac',
  valueForDate,
  width,
  theme = '#00b8ac',
  initialValue,
  disabledMinDate,
  disabledMaxDate,
} = defineProps<IPropsCalendar>()

const emit = defineEmits(['onSelectedDate'])

const MIN_YEAR = 1940 // Tahun minimal
const CURRENT_YEAR = dayjs().year() // Tahun sekarang

const isSelectingMonth = ref(false)
const isSelectingYear = ref(false)
// const selectedDate = ref<string | null>(initialDate().format('YYYY-MM-DD'))
// dibuat null, agar diawal tidak ada tanggal yang dipilih
const selectedDate = ref<string | null>(null)
// Ambil nilai dari defaultView atau fallback ke hari ini
const initialDate = () => {
  // console.log('init value = ', initialValue)
  if (initialValue) {
    selectedDate.value = initialValue
    return dayjs(initialValue)
  }
  if (defaultView) {
    // selectedDate.value = defaultView
    return dayjs(defaultView)
  }
  return dayjs()
}
// Set nilai awal berdasarkan defaultView
const selectedYear = ref(initialDate().year())
const selectedMonthIndex = ref(initialDate().month())
// Sesuaikan rentang tahun awal agar defaultView terlihat
const yearRangeStart = ref(Math.max(selectedYear.value - 11, MIN_YEAR))
const today = dayjs().format('YYYY-MM-DD')
const labelHoliday = ref<string | null>(null)
const isShowToast = ref(false)

// Fungsi cek apakah tanggal adalah hari ini
const isToday = (date: number) =>
  today ===
  dayjs(`${selectedYear.value}-${selectedMonthIndex.value + 1}-${date}`).format('YYYY-MM-DD')

const isSelectedDate = (date: number) => {
  if (!selectedDate.value) return false // Jangan pilih apa pun jika tidak ada selectedDate
  return (
    selectedDate.value ===
    dayjs(`${selectedYear.value}-${selectedMonthIndex.value + 1}-${date}`).format('YYYY-MM-DD')
  )
}

const years = computed(() =>
  Array.from({ length: 12 }, (_, i) => yearRangeStart.value + i).filter(
    (year) => year >= MIN_YEAR && year <= CURRENT_YEAR,
  ),
)
const months = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMM'))
const days = Array.from({ length: 7 }, (_, i) => dayjs().day(i).format('ddd'))

const selectedMonth = computed(() => months[selectedMonthIndex.value])
const firstDayOffset = computed(() =>
  dayjs(`${selectedYear.value}-${selectedMonthIndex.value + 1}-01`).day(),
)
const daysInMonth = computed(() =>
  dayjs(`${selectedYear.value}-${selectedMonthIndex.value + 1}-01`).daysInMonth(),
)

const canPrevYear = computed(() => yearRangeStart.value > MIN_YEAR)
const canNextYear = computed(() => yearRangeStart.value + 11 < CURRENT_YEAR)
const canPrevMonth = computed(
  () => !(selectedYear.value === MIN_YEAR && selectedMonthIndex.value === 0),
)

const previousMonthDays = computed(() => {
  const prevMonth = selectedMonthIndex.value === 0 ? 11 : selectedMonthIndex.value - 1
  const prevYear = selectedMonthIndex.value === 0 ? selectedYear.value - 1 : selectedYear.value
  const daysInPrevMonth = dayjs(`${prevYear}-${prevMonth + 1}-01`).daysInMonth()
  return Array.from(
    { length: firstDayOffset.value },
    (_, i) => daysInPrevMonth - firstDayOffset.value + i + 1,
  )
})

// disable, biar bisa next next
// const canNextMonth = computed(() => {
//   const today = dayjs()
//   return !(selectedYear.value === today.year() && selectedMonthIndex.value === today.month())
// })

// Fungsi untuk mendapatkan nilai berdasarkan tanggal
const getValueForDate = (date: number) => {
  const dateString = dayjs(`${selectedYear.value}-${selectedMonthIndex.value + 1}-${date}`).format(
    'YYYY-MM-DD',
  )
  return valueForDate?.find((item) => item.date === dateString)?.value || null
}

const handleDisabledDateClick = (date: number) => {
  // Format tanggal yang diklik menjadi 'YYYY-MM-DD'
  const dateString = dayjs(`${selectedYear.value}-${selectedMonthIndex.value + 1}-${date}`).format(
    'YYYY-MM-DD',
  )
  // Cari data disabledDates yang cocok dengan tanggal, bulan, dan tahun
  const foundDisabledDate = disabledDates?.find((d) => d.date === dateString)?.label

  if (foundDisabledDate) {
    labelHoliday.value = foundDisabledDate // Menampilkan label dari disabled date
    isShowToast.value = true
  } else {
    labelHoliday.value = null // Tidak ada data, tutup popover
    isShowToast.value = false
  }
}

const isDisabledDate = (date: number) => {
  const dayOfWeek = dayjs(`${selectedYear.value}-${selectedMonthIndex.value + 1}-${date}`).day()
  const dateString = dayjs(`${selectedYear.value}-${selectedMonthIndex.value + 1}-${date}`).format(
    'YYYY-MM-DD',
  )

  if (disabledWeekend && (dayOfWeek === 0 || dayOfWeek === 6)) return true
  if (disabledOnlySunday && dayOfWeek === 0) return true
  if (disabledOnlySaturday && dayOfWeek === 6) return true
  if (disabledDates?.find((item) => item.date === dateString)) return true

  if (disabledMinDate && dayjs(dateString).isBefore(dayjs(disabledMinDate), 'day')) return true
  if (disabledMaxDate && dayjs(dateString).isAfter(dayjs(disabledMaxDate), 'day')) return true

  return false
}

const isPastOrToday = (date: number) => {
  const today = dayjs()
  const selectedDate = dayjs(`${selectedYear.value}-${selectedMonthIndex.value + 1}-${date}`)

  // Jika disabledMaxDate ada, izinkan tanggal sampai batasnya
  if (disabledMaxDate && selectedDate.isBefore(dayjs(disabledMaxDate), 'day')) {
    return true
  }

  return selectedDate.isBefore(today, 'day') || selectedDate.isSame(today, 'day')
}

const toggleMonthList = () => {
  isSelectingMonth.value = !isSelectingMonth.value
  isSelectingYear.value = false
}

const toggleYearList = () => {
  isSelectingYear.value = !isSelectingYear.value
  isSelectingMonth.value = false
}

const selectMonth = (month: string) => {
  selectedMonthIndex.value = months.indexOf(month)
  isSelectingMonth.value = false
}

const selectYear = (year: number) => {
  selectedYear.value = year
  isSelectingYear.value = false
}

const prevYearRange = () => {
  if (canPrevYear.value) {
    yearRangeStart.value = Math.max(yearRangeStart.value - 12, MIN_YEAR)
  }
}

const nextYearRange = () => {
  if (canNextYear.value) {
    yearRangeStart.value = Math.min(yearRangeStart.value + 12, CURRENT_YEAR - 11)
  }
}

const selectDate = (date: number) => {
  if (!isDisabledDate(date)) {
    selectedDate.value = dayjs(
      `${selectedYear.value}-${selectedMonthIndex.value + 1}-${date}`,
    ).format('YYYY-MM-DD')
    emit('onSelectedDate', selectedDate.value)
  }
}

const prevMonth = () => {
  if (canPrevMonth.value) {
    if (selectedMonthIndex.value === 0) {
      selectedYear.value -= 1
      selectedMonthIndex.value = 11
    } else {
      selectedMonthIndex.value -= 1
    }
  }
}

const nextMonth = () => {
  // jika ingin disable header btn next
  // if (canNextMonth.value) {
  // }
  if (selectedMonthIndex.value === 11) {
    selectedYear.value += 1
    selectedMonthIndex.value = 0
  } else {
    selectedMonthIndex.value += 1
  }
}

onMounted(() => {
  if (checkDataIsNotEmpty(defaultView)) {
    const defaultDate = dayjs(defaultView)
    selectedYear.value = defaultDate.year()
    selectedMonthIndex.value = defaultDate.month()
    // selectedDate.value = null
  }
})
</script>

<template>
  <div
    class="relative p-3 pt-2 rounded-md bg-white shadow-gmail dark:bg-gray-800"
    :style="{ width: width }"
  >
    <!-- Header dengan tombol navigasi bulan -->
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center">
        <button
          class="text-[12px] text-gray-500 cursor-pointer px-1 hover:bg-gray-200 hover:rounded-md dark:text-gray-300 dark:bg-gray-800 hover:dark:bg-gray-700"
          @click="toggleMonthList"
        >
          {{ selectedMonth }}
        </button>

        <button
          class="text-[12px] text-gray-500 cursor-pointer px-1 hover:bg-gray-200 hover:rounded-md dark:text-gray-300 dark:bg-gray-800 hover:dark:bg-gray-700"
          @click="toggleYearList"
        >
          {{ selectedYear }}
        </button>
      </div>

      <div class="flex items-center justify-center">
        <button
          class="px-1 py-1 flex justify-center items-center border rounded disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-300 dark:bg-gray-800 hover:dark:bg-gray-700"
          :disabled="!canPrevMonth"
          @click="prevMonth"
        >
          <Icon icon="ion:chevron-back" class="text-base text-gray-500 dark:text-gray-300" />
        </button>
        <button
          class="px-1 py-1 flex justify-center items-center border rounded disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-300 dark:bg-gray-800 hover:dark:bg-gray-700"
          @click="nextMonth"
        >
          <!-- :disabled="!canNextMonth" -->
          <Icon icon="ion:chevron-forward" class="text-base text-gray-500 dark:text-gray-300" />
        </button>
      </div>
    </div>

    <!-- Pilihan bulan -->
    <div
      v-if="isSelectingMonth"
      class="absolute top-0 h-full left-0 z-10 bg-white dark:bg-gray-800 rounded-md w-full flex flex-col justify-between"
    >
      <div class="grid gap-2 grid-cols-3 p-2">
        <button
          v-for="(month, index) in months"
          :key="index"
          class="p-2 border rounded text-center hover:bg-gray-100 text-[12px] dark:bg-transparent dark:text-gray-300 hover:dark:bg-gray-700"
          :disabled="selectedYear === CURRENT_YEAR && index > dayjs().month()"
          @click="selectMonth(month)"
        >
          {{ month }}
        </button>
      </div>
      <div class="w-full mb-2">
        <div class="h-[1px] bg-gray-200 mb-2 dark:bg-gray-700"></div>
        <div class="px-6 flex flex-col justify-center gap-1">
          <button class="theme text-[12px]" @click="isSelectingMonth = false">Tutup</button>
        </div>
      </div>
    </div>

    <!-- Pilihan tahun -->
    <div
      v-if="isSelectingYear"
      class="absolute top-0 h-full left-0 z-10 bg-white dark:bg-gray-800 rounded-md w-full flex flex-col justify-between"
    >
      <div class="flex flex-col">
        <div class="flex px-4 justify-between items-center mb-2 mt-2">
          <button
            class="px-2 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed dark:bg-transparent dark:text-gray-300 hover:dark:bg-gray-700"
            :disabled="!canPrevYear"
            @click="prevYearRange"
          >
            <Icon icon="ion:chevron-back" class="text-base text-gray-500 dark:text-gray-300" />
          </button>
          <span class="font-semibold text-gray-500 dark:text-gray-300 text-[12px]">
            {{ yearRangeStart }} - {{ yearRangeStart + 11 }}
          </span>
          <button
            class="px-2 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed dark:bg-transparent dark:text-gray-300 hover:dark:bg-gray-700"
            :disabled="!canNextYear"
            @click="nextYearRange"
          >
            <Icon icon="ion:chevron-forward" class="text-base text-gray-500 dark:text-gray-300" />
          </button>
        </div>
        <div class="grid grid-cols-3 gap-2 px-4">
          <button
            v-for="year in years"
            :key="year"
            class="p-2 border rounded text-[12px] text-center hover:bg-gray-100 dark:bg-transparent dark:text-gray-300 hover:dark:bg-gray-700"
            @click="selectYear(year)"
          >
            {{ year }}
          </button>
        </div>
      </div>
      <div class="w-full mb-2">
        <div class="h-[1px] bg-gray-200 mb-2 dark:bg-gray-700"></div>
        <div class="px-6 flex flex-col justify-center gap-1">
          <button class="theme text-[12px]" @click="isSelectingYear = false">Tutup</button>
        </div>
      </div>
    </div>

    <!-- Kalender -->
    <div>
      <div
        class="grid grid-cols-7 gap-1 text-center text-[12px] text-[#7F8284] font-400 dark:text-gray-300"
      >
        <span v-for="day in days" :key="day">{{ day }}</span>
      </div>
      <div class="grid grid-cols-7 gap-1 mt-2">
        <span
          v-for="date in previousMonthDays"
          :key="`prev-${date}`"
          class="text-gray-300 dark:text-gray-600 flex justify-center items-center text-[12px]"
        >
          {{ date }}
        </span>
        <button
          v-for="date in daysInMonth"
          :key="date"
          :class="[
            'relative h-auto text-[12px] border rounded pt-[6px] flex flex-col justify-center items-center dark:bg-transparent dark:text-gray-300',
            {
              // theme: isSelectedDate(date),
              'bg-theme': isSelectedDate(date), // Jika dipilih, gunakan background theme
              'text-theme font-bold': isToday(date) && !isSelectedDate(date), // Jika hari ini, gunakan warna theme
              'hover:bg-gray-100 hover:dark:bg-gray-700': !isSelectedDate(date),
              'text-[#D1D5DB] cursor-not-allowed dark:text-gray-600':
                !isPastOrToday(date) || isDisabledDate(date),
            },
          ]"
          @click.stop="isDisabledDate(date) ? handleDisabledDateClick(date) : selectDate(date)"
        >
          <!-- :disabled="!isPastOrToday(date) || isDisabledDate(date)" -->
          <span
            v-if="dotActive && isToday(date)"
            class="absolute left-7 top-1 w-1 h-1 rounded-full"
            :style="{ backgroundColor: dotColor || '#00b8ac' }"
          ></span>
          <span class="font-500">{{ date }}</span>
          <span
            v-if="getValueForDate(date)"
            :class="[
              'text-[9px] mt-1',
              {
                'text-white': isSelectedDate(date),
                'text-gray-500': !isSelectedDate(date),
              },
            ]"
          >
            {{ getValueForDate(date) }}
          </span>
        </button>
      </div>
    </div>
    <!-- <ToastDynamic
      :show="isShowToast"
      position="top"
      :duration="3000"
      @update:show="isShowToast = $event"
    >
      <div
        class="bg-[#3899FE] border-[0.3px] border-solid border-[#4dadff] shadow-lg rounded-xl p-4 grid grid-cols-[24px_auto] gap-2 text-white"
      >
        <Icon name="fluent:info-24-filled" color="white" class="h-6 w-6" />
        <div class="mt-[2px]">{{ labelHoliday }}</div>
      </div>
    </ToastDynamic> -->
  </div>
</template>

<style scoped>
button {
  border: unset;
  /* transition: all 0.2s ease; */
}
.grid-cols-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
}

.theme {
  background-color: v-bind(theme);
  color: v-bind(getTextColorFromRgb);
}

.bg-theme {
  background-color: v-bind(theme);
  color: v-bind(getTextColorFromRgb);
}
.text-theme {
  color: v-bind(theme);
}
</style>
