// @flow
/**
 * Get an element's distance from the top of the viewport.
 *
 * @param {Object} el - A DOM element.
 * @returns {Number}
 */
export const getElDistanceTop = (el: any): number => { // eslint-disable-line
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
export const keysAreUnique = (state: State, children: Array<{$vnode: { key: number }, $el: HTMLElement }>): boolean => { // eslint-disable-line
  const keys = children.map(({ $vnode: { key }}) => key)
  if (hasDuplicates(keys)) return false

  const exists = keys.find(key => {
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
export const fetchComponentByKey = (key: ComponentKey, locations: LocationsList): ComponentLocation | void =>
  locations.find(location => location.component === key)

/**
 * Gets an elements position from the top of the page to the top and bottom of the element.
 *
 * @param {Obect} el - A DOM element.
 * @returns {(Object)}
 */
export const getElPosition = (el: any): ComponentPosition => { // eslint-disable-line
  const top = getElDistanceTop(el)
  const bottom = top + el.clientHeight
  return { top, bottom }
}

/**
 * Determines if an array has purely unique values.
 *
 * @param {Array} array - The array to check.
 * @returns {(Boolean)}
 */
export const hasDuplicates = (array: Array<mixed>): boolean => array
  .some((val, i) => array.indexOf(val) !== i)

/**
 * Gets the height of the document.
 *
 * @returns {(Number)}
 */
export const getDocumentHeight = (): number => {
  const body = document.body
  const html = document.documentElement

  if (body && html) {
    return Math.max(
      body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight
    )
  }
  return 0
}
