/* eslint-disable @typescript-eslint/no-explicit-any */
export const checkDataIsNotEmpty = (value: any): boolean =>
  !['', null, 'null', undefined, 'undefined'].includes(value)
