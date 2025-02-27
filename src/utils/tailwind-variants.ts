import { tv } from 'tailwind-variants'

export const getTextColorFromRgb = (theme: string) => {
  if (!theme) return '#000' // Default ke hitam jika tidak ada theme
  const r = parseInt(theme.substring(1, 3), 16)
  const g = parseInt(theme.substring(3, 5), 16)
  const b = parseInt(theme.substring(5, 7), 16)

  // Rumus luminansi relatif
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#000' : '#fff' // Hitam jika terang, putih jika gelap
}

export const appearance = tv({
  base: 'bg-white text-gray-900',
  variants: {
    appearance: {
      light: 'bg-white text-gray-900',
      dark: 'bg-gray-900 text-white',
    },
  },
})

export const button = tv({
  base: 'bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded',
  variants: {
    size: {
      sm: 'text-sm px-2 py-1',
      md: 'text-base px-3 py-2',
      lg: 'text-lg px-4 py-3',
    },
    color: {
      primary: 'bg-indigo-500 hover:bg-indigo-700',
      secondary: 'bg-gray-500 hover:bg-gray-700',
      danger: 'bg-red-500 hover:bg-red-700',
      warning: 'bg-amber-500 hover:bg-amber-700',
      info: 'bg-sky-500 hover:bg-sky-700',
    },
  },
})
