import { getElDistanceTop } from './helpers'

/**
 * Creates the scroll listener function.
 *
 * @param {Object} state - ScrollView tracking state.
 * @param {Array} fns - Functions to call on scroll.
 * @returns null
 */
export const createScrollListener = (state, ...fns) => {
  return () => {
    window.requestAnimationFrame(() => {
      fns.forEach(fn => fn(state))
    })
  }
}

/**
 * Checks if a component is visible in the viewport.
 *
 * @param {Object} state - ScrollView tracking state.
 * @returns null
 */
export const checkInViewport = (state) => {
  const down = state.scrollY <= window.scrollY
  state.locations.forEach(({ position, scrollview, component }) => {
    const toTopOfViewport = position - window.scrollY
    const { offset } = state.scrollviews[scrollview]
    if (down) {
      // scrolling down
      if (toTopOfViewport <= window.innerHeight - offset && toTopOfViewport > 0) {
        state.tracking[scrollview][component] = true
      } else {
        state.tracking[scrollview][component] = false
      }
    } else if (toTopOfViewport <= window.innerHeight && toTopOfViewport > offset) {
        // scrolling up
      state.tracking[scrollview][component] = true
    } else {
      state.tracking[scrollview][component] = false
    }
  })
  state.scrollY = window.scrollY
}

/**
 * Emits events on ScrollView $vms to update tracking for children.
 *
 * @param {Object} state - ScrollView tracking state.
 * @returns null
 */
export const broadcastScrollviews = ({ scrollviews, tracking }) => {
  Object.keys(scrollviews)
    .forEach(scrollview => scrollviews[scrollview].$emit('tracking:update', tracking[scrollview]))
}

/**
 * Resets cached component locations for ScrollView $vms
 *
 * @param {Object} state - ScrollView tracking state.
 * @returns null
 */
export const resetScrollviews = (state) => {
  state.locations = state.locations.map((location) => {
    const component = state.scrollviews[location.scrollview].$children
      .find(child => child.$vnode.key === location.component).$el
    location.position = getElDistanceTop(component)
    return location
  })
  state.scrollListener()
}
