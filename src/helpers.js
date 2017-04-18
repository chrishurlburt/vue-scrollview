export const getElDistanceTop = (el) => {
  let location = 0
  if (el.offsetParent) {
    do {
      location += el.offsetTop
      el = el.offsetParent
    } while (el)
  }
  return location >= 0 ? location : 0
}
