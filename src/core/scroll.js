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
  state.locations.forEach(({ position, scrollview, component }) => {
    const { offset } = state.scrollviews[scrollview]
    const withinTopBounds = (position.bottom - offset) - window.scrollY > 0
    const withinBottomBounds = (position.top + offset) - window.scrollY <= window.innerHeight
    state.tracking[scrollview][component] = (withinTopBounds && withinBottomBounds)
  })
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
    location.position = component.getBoundingClientRect()
    return location
  })
  state.scrollListener()
}
