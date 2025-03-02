import { tv } from 'tailwind-variants'

export const appearance = tv({
  base: 'bg-white text-gray-900',
  variants: {
    appearance: {
      light: 'bg-white text-gray-900',
      dark: 'bg-gray-900 text-white',
    },
  },
})
