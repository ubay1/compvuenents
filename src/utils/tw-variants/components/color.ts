import { getTextColorFromRgb } from '@/utils/color'
import { tv } from 'tailwind-variants'

export const colorVariant = tv({
  variants: {
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
    color_outline_bg_soft: {
      notfound: '',
      primary:
        'bg-green-50 text-green-600 border border-green-600 dark:text-green-400 dark:border-green-400 dark:bg-green-900/30',
      secondary:
        'bg-gray-100 text-gray-600 border border-gray-500 dark:text-gray-300 dark:border-gray-400 dark:bg-gray-900/30',
      danger:
        'bg-red-50 text-red-600 border border-red-500 dark:text-red-400 dark:border-red-400 dark:bg-red-900/30',
      warning:
        'bg-yellow-50 text-yellow-600 border border-yellow-500 dark:text-yellow-400 dark:border-yellow-400 dark:bg-yellow-900/30',
      info: 'bg-cyan-50 text-cyan-600 border border-cyan-500 dark:text-cyan-400 dark:border-cyan-400 dark:bg-cyan-900/30',
      disabled:
        'bg-transparent text-gray-300 border border-gray-200 cursor-not-allowed dark:text-gray-600 dark:border-gray-700',
    },
  },
})
