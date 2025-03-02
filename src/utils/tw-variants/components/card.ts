import { tv } from 'tailwind-variants'

export const cardVariant = tv({
  slots: {
    base: 'overflow-hidden rounded-lg transition-all duration-200 bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/30 hover:shadow-lg dark:hover:shadow-gray-900/40',
    wrapperImg: 'w-full h-48 overflow-hidden',
    img: 'object-cover w-full h-full',
    titleClass: 'mt-0 mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100',
    descClass: 'mt-0 mb-4 text-gray-600 dark:text-gray-300 leading-relaxed',
    footer: 'mt-4 pt-4 border-t border-gray-100 dark:border-gray-700',
  },
})
