import { tv } from 'tailwind-variants'
import { getTextColorFromRgb } from '@/utils/color'
import { colorVariant } from "./color";

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
      xs: 'h-8 px-2 text-[10px]',
      sm: 'h-10 px-2 text-sm',
      md: 'h-12 px-4 text-base',
      lg: 'h-16 px-6 text-lg',
    },
    ...colorVariant.variants,
  },
})
