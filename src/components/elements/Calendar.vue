<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/return-in-computed-property -->

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { Icon } from '@iconify/vue'
import type { IPropsCalendar } from '@/types/components'
import { checkDataIsNotEmpty } from '@/utils/validations'
import { removeZeroInNumber } from '@/utils/transform'

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
  withRange,
} = defineProps<IPropsCalendar>()

const emit = defineEmits(['onSelectedDate'])

const MIN_YEAR = 1940 // Tahun minimal
const CURRENT_YEAR = dayjs().year() // Tahun sekarang

const isSelectingMonth = ref(false)
const isSelectingYear = ref(false)

// initial value untuk date range
const rangeStart = ref<string | null>(null)
const rangeEnd = ref<string | null>(null)
const rangeStartMonth = ref<number>(0)
const rangeEndMonth = ref<number>(0)
const fullDateRangeStart = ref<string | null>(null)
const fullDateRangeEnd = ref<string | null>(null)
const withInitValue = ref(false)
const totalSelectedDatesStart = ref(0)
const totalSelectedDatesEnd = ref(0)

// initial value untuk date range
// dibuat null, agar diawal tidak ada tanggal yang dipilih
const selectedDate = ref<string | null>(null)

/**
 * @description fungsi untuk melakukan pengecekan initail value & props withRange.
 * jika props withRange true, maka akan menampilkan range date.
 * jika props withRange false, maka akan menampilkan single date.
 * jika tidak ada props withRange, maka akan menampilkan single date.
 * jika tidak ada props initialValue, maka akan menampilkan tanggal sekarang.
 * return ditiap" kondisi untuk menampilkan kalender sesuai tanggal,bulan,tahun dari initialValue
 */
const initialDate = () => {
  if (initialValue && !withRange) {
    selectedDate.value = initialValue as string

    return dayjs(initialValue as string)
  }
  if (initialValue && withRange) {
    interface initValueObject {
      startDate: string
      startOnlyDate: string
      endDate: string
      endOnlyDate: string
    }

    rangeStart.value = (initialValue as unknown as initValueObject).startOnlyDate
    rangeEnd.value = (initialValue as unknown as initValueObject).endOnlyDate
    fullDateRangeStart.value = (initialValue as unknown as initValueObject).startDate
    fullDateRangeEnd.value = (initialValue as unknown as initValueObject).endDate
    withInitValue.value = true
    // totalSelectedDates.value += 1
    return dayjs((initialValue as unknown as initValueObject).startDate)
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
const yearRangeStart = ref(Math.max(selectedYear.value - 9, MIN_YEAR))
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
  Array.from({ length: 10 }, (_, i) => yearRangeStart.value + i).filter(
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
const canPrevYearInList = computed(() => selectedYear.value > MIN_YEAR)
const canNextYear = computed(() => yearRangeStart.value + 9 < CURRENT_YEAR)
const canNextYearInList = computed(() => selectedYear.value < CURRENT_YEAR)
// const canNextYear = computed(() => yearRangeStart.value + 11 < CURRENT_YEAR)
const canPrevMonth = computed(
  () => !(selectedYear.value === MIN_YEAR && selectedMonthIndex.value === 0),
)

const prevMonthInList = () => {
  if (canPrevYearInList.value) {
    selectedYear.value -= 1 // Kurangi tahun sebanyak 1
  }
}
const canNextMonth = computed(() => {
  if (selectedYear.value === dayjs(disabledMaxDate).year()) {
    if (Number(selectedMonthIndex.value) < dayjs(disabledMaxDate).month()) {
      return true
    }
  } else {
    return true
  }
})

const textColor = computed(() => {
  if (!theme) return '#000' // Default ke hitam jika tidak ada theme
  const r = parseInt(theme.substring(1, 3), 16)
  const g = parseInt(theme.substring(3, 5), 16)
  const b = parseInt(theme.substring(5, 7), 16)

  // Rumus luminansi relatif
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#000' : '#fff' // Hitam jika terang, putih jika gelap
})
const previousMonthDays = computed(() => {
  const prevMonth = selectedMonthIndex.value === 0 ? 11 : selectedMonthIndex.value - 1
  const prevYear = selectedMonthIndex.value === 0 ? selectedYear.value - 1 : selectedYear.value
  const daysInPrevMonth = dayjs(`${prevYear}-${prevMonth + 1}-01`).daysInMonth()
  return Array.from(
    { length: firstDayOffset.value },
    (_, i) => daysInPrevMonth - firstDayOffset.value + i + 1,
  )
})

const nextMonthDays = computed(() => {
  // Calculate total cells needed for 6 rows (6 rows * 7 days = 42 cells)
  const totalCells = 42

  // Calculate how many cells are already filled
  const filledCells = previousMonthDays.value.length + daysInMonth.value

  // Calculate how many next month days we need to show
  const nextMonthDaysNeeded = totalCells - filledCells

  // Return an array of the required length with numbers starting from 1
  return Array.from({ length: nextMonthDaysNeeded }, (_, i) => i + 1)
})

// Calculate fixed height for date cells to maintain consistent calendar height
const dateButtonHeight = '36px'

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

  // Jika disabledMaxDate ada, izinkan tanggal sampai batasnya (termasuk tanggal tersebut)
  if (disabledMaxDate) {
    return (
      selectedDate.isBefore(dayjs(disabledMaxDate), 'day') ||
      selectedDate.isSame(dayjs(disabledMaxDate), 'day')
    )
  }

  // Jika tidak ada disabledMaxDate, izinkan tanggal yang sama atau sebelum hari ini
  return selectedDate.isBefore(today, 'day') || selectedDate.isSame(today, 'day')
}

const toggleMonthList = () => {
  isSelectingMonth.value = !isSelectingMonth.value
  isSelectingYear.value = false
}

const toggleYearList = () => {
  // jika tahun yang dipilih ditambah 11 tahun kurang dari tahun sekarang.
  // misal tahun yang dipilih 2022, maka ini tidak ketrigger.
  // misal tahun yang dipilih 2013, maka ini ke trigger
  if (selectedYear.value + 9 < CURRENT_YEAR) {
    yearRangeStart.value = Math.max(selectedYear.value, MIN_YEAR)
  }
  isSelectingYear.value = !isSelectingYear.value
  isSelectingMonth.value = false
}

const selectMonth = (month: string) => {
  selectedMonthIndex.value = months.indexOf(month)
  isSelectingMonth.value = false
}

const selectYear = (year: number) => {
  selectedYear.value = year // Set tahun yang dipilih
  isSelectingYear.value = false // Tutup list tahun
  isSelectingMonth.value = true // Buka list bulan
}

const prevYearRange = () => {
  if (canPrevYear.value) {
    // yearRangeStart.value = Math.max(yearRangeStart.value - 12, MIN_YEAR)
    // Ubah pengurangan dari 12 menjadi 10
    yearRangeStart.value = Math.max(yearRangeStart.value - 10, MIN_YEAR)
  }
}

const nextYearRange = () => {
  if (canNextYear.value) {
    // yearRangeStart.value = Math.min(yearRangeStart.value + 12, CURRENT_YEAR - 11)
    // Ubah penambahan dari 12 menjadi 10 dan pengurangan dari 11 menjadi 9
    yearRangeStart.value = Math.min(yearRangeStart.value + 10, CURRENT_YEAR - 9)
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
  // di kalnder ini monthindex 1 = maret,
  // jadi, selectedYear akan ditambah 1, jika sudah sampai di bulan januari tahun berikutnya.
  // harusnya ketika sampai di desmber tahun ini, button next disabled
  // console.log(selectedMonthIndex.value)
  if (canNextMonth.value) {
    if (selectedMonthIndex.value === 11) {
      selectedYear.value += 1
      if (selectedYear.value <= dayjs(disabledMaxDate).year()) {
        selectedMonthIndex.value = 0
      } else {
        selectedYear.value = dayjs(disabledMaxDate).year()
        selectedMonthIndex.value = 11
      }
    } else {
      selectedMonthIndex.value += 1
    }
  }
}
const nextMonthInList = () => {
  if (canNextYearInList.value) {
    selectedYear.value += 1 // Tambah tahun sebanyak 1
  }
}

/**
 * @description 3 fungsi ini untuk melakukan pengecekan apakah tanggal yang dipilih berada diantara tanggal awal dan tanggal akhir.
 * @param date tanggal yang dipilih
 * @returns true jika tanggal berada diantara tanggal awal dan tanggal akhir
 * @returns false jika tanggal tidak berada diantara tanggal awal dan tanggal akhir
 */
const isInRange = (date: string) => {
  if (!rangeStart.value || !rangeEnd.value) return false
  return (
    dayjs(`${selectedYear.value}-${selectedMonthIndex.value + 1}-${date}`).isAfter(
      fullDateRangeStart.value,
    ) &&
    dayjs(`${selectedYear.value}-${selectedMonthIndex.value + 1}-${date}`).isBefore(
      fullDateRangeEnd.value,
    )
  )
}
const isRangeStart = (date: string) => {
  if (!rangeStart.value) return false
  if (withInitValue.value && totalSelectedDatesStart.value === 0) {
    return (
      dayjs(`${selectedYear.value}-${selectedMonthIndex.value + 1}-${date}`).format(
        'YYYY-MM-DD',
      ) === fullDateRangeStart.value
    )
  }
  if (!withInitValue.value || (withInitValue.value && totalSelectedDatesStart.value > 0)) {
    return date === rangeStart.value && rangeStartMonth.value === selectedMonthIndex.value + 1
  }
}
const isRangeEnd = (date: string) => {
  if (!rangeEnd.value) return false
  if (withInitValue.value && totalSelectedDatesEnd.value === 0) {
    return (
      dayjs(`${selectedYear.value}-${selectedMonthIndex.value + 1}-${date}`).format(
        'YYYY-MM-DD',
      ) === fullDateRangeEnd.value
    )
  }
  if (!withInitValue.value || (withInitValue.value && totalSelectedDatesEnd.value > 0)) {
    return date === rangeEnd.value && rangeEndMonth.value === selectedMonthIndex.value + 1
  }
}

/**
 * @description fungsi ini handle tanggal yang dipilih.
 * @description jika rangeStart telah dipilih, lalu user pilih rangeEnd lebih kecil dari rangeStart maka rangeStart akan diganti dengan rangeEnd.
 * @param date tanggal yang dipilih
 *
 * untuk withRange
 * @returns true jika tanggal berada diantara tanggal awal dan tanggal akhir
 * @returns false jika tanggal tidak berada diantara tanggal awal dan tanggal akhir
 */
const handleDateClick = (date: string) => {
  if (withRange) {
    if (!rangeStart.value || (rangeStart.value && rangeEnd.value)) {
      rangeStart.value = date
      rangeEnd.value = null
      rangeStartMonth.value = selectedMonthIndex.value + 1
      totalSelectedDatesStart.value += 1
      fullDateRangeStart.value = dayjs(
        `${selectedYear.value}-${selectedMonthIndex.value + 1}-${date}`,
      ).format('YYYY-MM-DD')
    } else if (!rangeEnd.value) {
      const start = removeZeroInNumber(rangeStart.value)
      const end = removeZeroInNumber(date)

      if (Number(end) < Number(start)) {
        rangeStart.value = date
        rangeEnd.value = null
        fullDateRangeStart.value = dayjs(
          `${selectedYear.value}-${selectedMonthIndex.value + 1}-${date}`,
        ).format('YYYY-MM-DD')
      } else {
        fullDateRangeEnd.value = dayjs(
          `${selectedYear.value}-${selectedMonthIndex.value + 1}-${date}`,
        ).format('YYYY-MM-DD')
        rangeEnd.value = date
        rangeEndMonth.value = selectedMonthIndex.value + 1

        totalSelectedDatesEnd.value += 1

        emit('onSelectedDate', {
          startDate: dayjs(
            `${selectedYear.value}-${rangeStartMonth.value}-${rangeStart.value}`,
          ).format('YYYY-MM-DD'),
          endDate: dayjs(`${selectedYear.value}-${rangeEndMonth.value}-${rangeEnd.value}`).format(
            'YYYY-MM-DD',
          ),
        })
      }
    }
  } else if (!isDisabledDate(Number(date))) {
    selectedDate.value = dayjs(
      `${selectedYear.value}-${selectedMonthIndex.value + 1}-${date}`,
    ).format('YYYY-MM-DD')
    emit('onSelectedDate', selectedDate.value)
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
    class="relative p-3 pt-2 border border-gray-100 rounded-md bg-white shadow-gmail dark:bg-gray-800 dark:shadow-none dark:border-gray-500"
    :style="{ width: width }"
  >
    <!-- Header dengan tombol navigasi bulan -->
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center">
        <button
          class="text-[12px] font-semibold cursor-pointer disabled:cursor-not-allowed hover:bg-gray-200 p-1 rounded-md dark:text-gray-300 dark:bg-gray-800 hover:dark:bg-gray-700"
          type="button"
          @click.stop="toggleMonthList"
        >
          {{ selectedMonth }}
        </button>

        <button
          class="text-[12px] font-semibold cursor-pointer disabled:cursor-not-allowed hover:bg-gray-200 p-1 rounded-md dark:text-gray-300 dark:bg-gray-800 hover:dark:bg-gray-700"
          type="button"
          @click.stop="toggleYearList"
        >
          {{ selectedYear }}
        </button>
      </div>

      <div class="flex items-center justify-center">
        <button
          :class="[
            'flex justify-center items-center border hover:bg-gray-200 p-1 rounded-md dark:text-gray-300 dark:bg-gray-800 hover:dark:bg-gray-700',
            {
              '!cursor-not-allowed opacity-30': !canPrevMonth,
              'cursor-pointer': canPrevMonth,
            },
          ]"
          :disabled="!canPrevMonth"
          type="button"
          @click.stop="prevMonth"
        >
          <Icon icon="ion:chevron-back" size="16" />
        </button>
        <button
          :class="[
            'flex justify-center items-center border hover:bg-gray-200 p-1 rounded-md dark:text-gray-300 dark:bg-gray-800 hover:dark:bg-gray-700',
            {
              '!cursor-not-allowed opacity-30': !canNextMonth,
              'cursor-pointer': canNextMonth,
            },
          ]"
          :disabled="!canNextMonth"
          type="button"
          @click="nextMonth"
        >
          <Icon icon="ion:chevron-forward" size="16" />
        </button>
      </div>
    </div>

    <!-- Pilihan bulan -->
    <div
      v-if="isSelectingMonth"
      class="absolute top-0 h-full left-0 z-10 bg-white rounded-md w-full flex flex-col justify-between dark:bg-gray-800"
    >
      <div class="flex flex-col">
        <div class="flex px-4 justify-between items-center mb-2 mt-2">
          <button
            class="px-2 py-1 border rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed hover:bg-gray-200 dark:bg-transparent dark:text-gray-300 hover:dark:bg-gray-700"
            :disabled="!canPrevYearInList"
            type="button"
            @click="prevMonthInList"
          >
            <Icon icon="ion:chevron-back" size="16" />
          </button>
          <span
            class="font-semibold cursor-pointer rounded-md p-2 hover:bg-gray-100 dark:bg-transparent dark:text-gray-300 hover:dark:bg-gray-700"
            @click="toggleYearList"
          >
            {{ selectedYear }}
          </span>
          <button
            class="px-2 py-1 border rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed hover:bg-gray-200 dark:bg-transparent dark:text-gray-300 hover:dark:bg-gray-700"
            :disabled="!canNextYearInList"
            type="button"
            @click="nextMonthInList"
          >
            <Icon icon="ion:chevron-forward" size="16" />
          </button>
        </div>
        <div class="grid gap-2 gap-y-4 grid-cols-3 px-6 mt-2">
          <button
            v-for="(month, index) in months"
            :key="index"
            class="p-2 border rounded text-center hover:bg-gray-100 text-[12px] cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 dark:bg-transparent dark:text-gray-300 hover:dark:bg-gray-700"
            :disabled="selectedYear === CURRENT_YEAR && index > dayjs().month()"
            type="button"
            @click="selectMonth(month)"
          >
            {{ month }}
          </button>
        </div>
      </div>
      <div class="w-full mb-2">
        <div class="h-[1px] bg-gray-200 mb-2 dark:bg-gray-500"></div>
        <div class="px-6 flex flex-col justify-center gap-1">
          <button
            class="theme p-2 rounded-md cursor-pointer text-[12px] hover:opacity-90"
            type="button"
            @click="isSelectingMonth = false"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>

    <!-- Pilihan tahun -->
    <div
      v-if="isSelectingYear"
      class="absolute top-0 h-full left-0 z-10 bg-white rounded-md w-full flex flex-col justify-between dark:bg-gray-800"
    >
      <div class="flex flex-col">
        <div class="flex px-4 justify-between items-center mb-2 mt-4">
          <button
            class="px-2 py-1 border rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed hover:bg-gray-200 dark:bg-transparent dark:text-gray-300 hover:dark:bg-gray-700"
            :disabled="!canPrevYear"
            type="button"
            @click="prevYearRange"
          >
            <Icon icon="ion:chevron-back" size="16" />
          </button>
          <span class="font-semibold dark:text-gray-300"
            >{{ yearRangeStart }} - {{ yearRangeStart + 9 }}</span
          >
          <button
            class="px-2 py-1 border rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed hover:bg-gray-200 dark:bg-transparent dark:text-gray-300 hover:dark:bg-gray-700"
            :disabled="!canNextYear"
            type="button"
            @click="nextYearRange"
          >
            <Icon icon="ion:chevron-forward" size="16" />
          </button>
        </div>
        <div class="grid grid-cols-2 gap-2 px-6 mt-2">
          <button
            v-for="year in years"
            :key="year"
            class="p-2 border rounded text-[12px] text-center cursor-pointer disabled:cursor-not-allowed hover:bg-gray-100 dark:bg-transparent dark:text-gray-300 hover:dark:bg-gray-700"
            type="button"
            @click="selectYear(year)"
          >
            {{ year }}
          </button>
        </div>
      </div>
      <div class="w-full mb-2">
        <div class="h-[1px] bg-gray-200 mb-2 dark:bg-gray-500"></div>
        <div class="px-6 flex flex-col justify-center gap-1">
          <button
            class="theme p-2 rounded-md cursor-pointer text-[12px] hover:opacity-90"
            type="button"
            @click="isSelectingYear = false"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>

    <!-- Kalender -->
    <div>
      <div
        class="grid grid-cols-7 gap-0 text-center text-[12px] text-gray-300 font-400 dark:text-gray-300"
      >
        <span v-for="day in days" :key="day">{{ day }}</span>
      </div>
      <div class="grid grid-cols-7 gap-0 mt-2">
        <span
          v-for="date in previousMonthDays"
          :key="`prev-${date}`"
          class="text-gray-300 dark:text-gray-600 flex justify-center items-center text-[12px]"
          :style="{ height: dateButtonHeight }"
        >
          {{ date }}
        </span>
        <button
          v-for="date in daysInMonth"
          :key="date"
          :class="[
            'relative h-auto text-[12px] border rounded-none p-2 flex flex-col justify-center items-center cursor-pointer disabled:cursor-not-allowed dark:bg-transparent dark:text-gray-300',
            {
              // theme: isSelectedDate(date),
              'bg-theme !rounded': !withRange && isSelectedDate(date), // Jika dipilih, gunakan background theme
              'text-theme font-bold': !withRange && isToday(date) && !isSelectedDate(date),
              'text-gray-300 !opacity-100 dark:text-gray-600 !cursor-not-allowed':
                (!withRange && !isPastOrToday(date)) || (!withRange && isDisabledDate(date)),
              'hover:bg-gray-100 hover:dark:bg-gray-700 hover:rounded': !isSelectedDate(date),

              'bg-theme-for-range rounded-l-full': withRange && isRangeStart(String(date)),
              'bg-theme-for-range rounded-r-full': withRange && isRangeEnd(String(date)),
              'bg-theme-soft-for-range hover:!bg-gray-100 hover:dark:!bg-gray-700':
                withRange && isInRange(String(date)),
              'text-gray-300 dark:text-gray-600 !cursor-not-allowed':
                (withRange && !isPastOrToday(date)) || (withRange && isDisabledDate(date)),
            },
          ]"
          :style="{ height: dateButtonHeight }"
          :disabled="!isPastOrToday(date) || isDisabledDate(date)"
          type="button"
          @click="handleDateClick(String(date))"
        >
          <!-- @click.stop="isDisabledDate(date) ? handleDisabledDateClick(date) : selectDate(date)" -->
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
        <!-- Next month days -->
        <span
          v-for="date in nextMonthDays"
          :key="`next-${date}`"
          class="text-gray-300 dark:text-gray-600 flex justify-center items-center text-[12px]"
          :style="{ height: dateButtonHeight }"
        >
          {{ date }}
        </span>
      </div>
    </div>
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
  color: v-bind(textColor);
}

.bg-theme {
  background-color: v-bind(theme);
  color: v-bind(textColor);
}
.bg-theme-for-range {
  background-color: v-bind(theme);
  color: v-bind(textColor) !important;
}
.bg-theme-soft-for-range {
  background-color: v-bind(theme);
  opacity: 0.5 !important;
  color: v-bind(textColor);
}
.text-theme {
  color: v-bind(theme);
}
</style>
