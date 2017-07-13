/**
 * Get an element's distance from the top of the viewport.
 *
 * @param {Object} el - A DOM element.
 * @returns {Number}
 */
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

/**
 * Determines if a set of keys are unique against the existing keys.
 *
 * @param {Object} state - ScrollView tracking state.
 * @param {Array} children - A ScrollView $vm children nodes
 * @returns {Boolean}
 */
export const keysAreUnique = (state, children) => {
  const exists = children.find(({ $vnode: { key }}) => {
    const match = state.locations.find(({ component }) => {
      return component === key
    })
    return !!(match)
  })
  return !(exists)
}

/**
 * Fetches a component by the key it was set to track by.
 *
 * @param {Number} key - The componenets key
 * @param {Array} locations - The locations of currently tracked components.
 * @returns {(Object|Boolean)}
 */
export const fetchComponentByKey = (key, locations) =>
  locations.find(location => location.component === key)

export const getElPosition = (el) => {
  const top = getElDistanceTop(el)
  const bottom = top + el.clientHeight
  return { top, bottom }
}
