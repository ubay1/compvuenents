import { tv } from 'tailwind-variants'

export const accordionVariant = tv({
  slots: {
    buttonToggle: 'w-full py-4 px-0 text-left flex justify-between focus:outline-none',
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
        icon: 'rotate-180',
      },
      false: {
        icon: 'rotate-0',
      },
    },
  },
})
