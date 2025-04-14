export interface IPropsCalendar {
  disabledWeekend?: boolean
  disabledOnlySunday?: boolean
  disabledOnlySaturday?: boolean
  disabledDates?: { date: string; label: string }[]
  defaultView?: string // YYYY-MM-DD
  dotActive?: boolean
  dotColor?: string
  valueForDate?: { date: string; value: string }[]
  width?: string
  theme?: string
  initialValue?: string
  disabledMinDate?: string // Format: YYYY-MM-DD
  disabledMaxDate: string // Format: YYYY-MM-DD
  maxYear?: number
}

export interface IPropsDatePicker {
  prependIcon?: boolean
  formatShowDate?: string
  showIconCalendar?: boolean
  colorIconCalendar?: string
  theme?: string
  label?: string
  name?: string
  id?: string
  placeholder?: string
  isFloating?: boolean
  isRequired?: boolean
  defaultView?: string
  isFlipList?: boolean
  positionCalendar?: 'top-start' | 'bottom-start'
  disabled?: boolean
}
