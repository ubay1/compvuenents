import { tv } from 'tailwind-variants'
import { colorVariant } from './color'

export const chipVariant = tv({
  base: 'px-3 py-1 rounded-full text-sm font-medium text-nowrap',
  variants: {
    ...colorVariant.variants
  }
})
