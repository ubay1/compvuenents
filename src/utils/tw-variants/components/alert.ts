import { tv } from 'tailwind-variants'

export const alertVariant = tv({
  slots: {
    base: 'p-4 mb-4 rounded-lg relative border flex items-start',
    buttonX: 'absolute top-1 p-0 right-3 bg-transparent border-none text-2xl cursor-pointer',
  },
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
