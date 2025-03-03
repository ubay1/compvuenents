export const getTextColorFromRgb = (theme: string) => {
  if (!theme) return '#000' // Default ke hitam jika tidak ada theme
  const r = parseInt(theme.substring(1, 3), 16)
  const g = parseInt(theme.substring(3, 5), 16)
  const b = parseInt(theme.substring(5, 7), 16)

  // Rumus luminansi relatif
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#000' : '#fff' // Hitam jika terang, putih jika gelap
}
