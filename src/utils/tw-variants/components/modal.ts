import { tv } from 'tailwind-variants'

export const modalVariant = tv({
  slots: {
    backdrop: 'fixed inset-0 bg-black/50 bg-opacity-10 z-40',
    wrapperContent: 'fixed inset-0 flex items-center justify-center z-50 py-8',
    cardContent:
      'relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 pt-4 w-[90%] md:w-1/2 max-h-[90vh] overflow-y-auto',
    buttonX: 'absolute top-1 right-3 bg-transparent border-none text-2xl cursor-pointer dark:text-white',
  },
  variants: {
    withBgBlur: {
      true: {
        backdrop: 'backdrop-blur-lg',
      },
      false: {
        backdrop: 'backdrop-blur-none',
      },
    },
  },
})
