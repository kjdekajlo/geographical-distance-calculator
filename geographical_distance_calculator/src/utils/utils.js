export const capitalize = (text) => {
  const firstLetter = text[0].toUpperCase()
  const rest = text.slice(1)
  const newText = `${firstLetter}${rest}`

  return newText
}

export const shorten = (number) => {
  return number.toFixed(3)
}

export const metersToKilometers = (number) => {
  return number / 1000
}