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

export const buttonVariant = tv({
  base: 'transition-colors duration-200 ease-in-out',
  variants: {
    block: {
      true: 'w-full',
      false: '',
    },
    rounded: {
      true: 'rounded-full',
      false: '',
    },
    size: {
      sm: 'h-8 px-2 text-sm',
      md: 'h-12 px-4 text-base',
      lg: 'h-16 px-6 text-lg',
    },
    color_fill: {
      notfound: '',
      primary: `bg-green-600 hover:bg-green-700 border border-green-600 ${getTextColorFromRgb('#615fff') === '#000' ? 'text-[#000]' : 'text-[#fff]'} dark:bg-green-700 dark:hover:bg-green-800 dark:border-green-700`,
      secondary: `bg-gray-500 hover:bg-gray-600 border border-gray-500 ${getTextColorFromRgb('#6a7282') === '#000' ? 'text-[#000]' : 'text-[#fff]'} dark:bg-gray-600 dark:hover:bg-gray-700 dark:border-gray-600`,
      danger: `bg-red-500 hover:bg-red-600 border border-red-500 ${getTextColorFromRgb('#fb2c36') === '#000' ? 'text-[#000]' : 'text-[#fff]'} dark:bg-red-600 dark:hover:bg-red-700 dark:border-red-600`,
      warning: `bg-yellow-500 hover:bg-yellow-600 border border-yellow-500 ${getTextColorFromRgb('#efb100') === '#000' ? 'text-[#000]' : 'text-[#fff]'} dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:border-yellow-600`,
      info: `bg-cyan-500 hover:bg-cyan-600 border border-cyan-500 ${getTextColorFromRgb('#00b8db') === '#000' ? 'text-[#000]' : 'text-[#fff]'} dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:border-cyan-600`,
      disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400',
    },
    color_outline: {
      notfound: '',
      primary:
        'bg-transparent hover:bg-green-50 text-green-600 border border-green-600 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-900/30',
      secondary:
        'bg-transparent hover:bg-gray-100 text-gray-600 border border-gray-500 dark:text-gray-300 dark:border-gray-400 dark:hover:bg-gray-900/30',
      danger:
        'bg-transparent hover:bg-red-50 text-red-600 border border-red-500 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/30',
      warning:
        'bg-transparent hover:bg-yellow-50 text-yellow-600 border border-yellow-500 dark:text-yellow-400 dark:border-yellow-400 dark:hover:bg-yellow-900/30',
      info: 'bg-transparent hover:bg-cyan-50 text-cyan-600 border border-cyan-500 dark:text-cyan-400 dark:border-cyan-400 dark:hover:bg-cyan-900/30',
      disabled:
        'bg-transparent text-gray-300 border border-gray-200 cursor-not-allowed dark:text-gray-600 dark:border-gray-700',
    },
  },
})

export const alertVariant = tv({
  base: 'p-4 mb-4 rounded-lg relative border flex items-start',
  variants: {
    color: {
      info: 'bg-blue-100 border-blue-200 text-blue-900 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200',
      success:
        'bg-green-100 border-green-200 text-green-900 dark:bg-green-950 dark:border-green-800 dark:text-green-200',
      warning:
        'bg-yellow-100 border-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-200',
      error:
        'bg-red-100 border-red-200 text-red-900 dark:bg-red-950 dark:border-red-800 dark:text-red-200',
    },
  },
})
