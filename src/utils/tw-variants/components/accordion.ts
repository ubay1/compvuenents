import { tv } from 'tailwind-variants'

export const accordionVariant = tv({
  slots: {
    buttonToggle: 'w-full px-0 text-left flex justify-between bg-white dark:bg-gray-800 focus:outline-none',
    icon: 'transform transition-transform duration-200',
  },
  variants: {
    withDescription: {
      true: {
        buttonToggle: 'items-start',
      },
      false: {
        buttonToggle: 'items-center',
      },
    },
    open: {
      true: {
        icon: 'px-2 rotate-180',
      },
      false: {
        icon: 'px-2 rotate-0',
      },
    },
  },
})
