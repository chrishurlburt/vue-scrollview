// @flow
import throttle from 'lodash.throttle'

import { getElPosition, getDocumentHeight } from './helpers'
import {
  createScrollListener,
  checkInViewport,
  broadcastScrollviews,
  resetScrollviews,
  setScrollDirection
} from './scroll'

/**
 * Initializes a ScrollView $vm into tracking.
 *
 * @param {Object} state - ScrollView tracking state.
 * @param {Object} ScrollView - The ScrollView $vm
 * @returns {Object} Component locations and ScrollViews being tracked.
 */
export const initializeScrollview = (state: State, { _uid, $children }: ScrollviewComponent) => {
  return $children.reduce((data, { $el, $vnode: { key: child }}) => {
    const position = getElPosition($el)
    data.locations.push({
      position,
      scrollview: _uid,
      component: child
    })
    data.tracking[child] = false
    setLastComponent(state, { scrollview: _uid, component: child, position })
    return data
  }, { locations: [], tracking: {}})
}

/**
 * Stores data for the last component on the page.
 *
 * @param {Object} State - ScrollView tracking state.
 * @param {Object} ComponentData - An object containing the key and position of a component.
 * @returns {Object} null
 */
export const setLastComponent = (state: State, { component, position, scrollview }: ComponentLocation) => {
  if (
    (!state.lastComponent.key || !state.lastComponent.position) ||
    (state.lastComponent.position.top < position.top)
  ) {
    state.lastComponent = { key: component, position, scrollview }
    state.firedOnLastEntered = false
  }
}

/**
 * Attaches the scroll listener.
 *
 * @param {Object} state - ScrollView tracking state.
 * @returns {Object} ScrollView tracking state.
 */
export const attachScrollListener = (state: State): State => {
  state.scrollListener = throttle(
    createScrollListener(
      state,
      [checkInViewport, broadcastScrollviews, setScrollDirection, ...state.callbacks]
    ),
    state.throttle,
    { leading: true }
  )
  document.addEventListener('scroll', state.scrollListener, false)
  return state
}

/**
 * Attaches the recache el to the DOM and sets up recache polling.
 *
 * @param {Object} state - ScrollView tracking state.
 * @returns {Object} ScrollView tracking state.
 */
export const attachRecacheListener = (state: State): State => {
  setInterval(() => checkIfRecache(state, () => resetScrollviews(state)), 1000)
  return state
}

/**
 * Checks if component positions need to be recached.
 *
 * @param {Object} state - ScrollView tracking state.
 * @param {Function} resetFn - Function that dicates how to recache.
 * @returns null
 */
const checkIfRecache = (state: State, resetFn) => {
  const currentHeight = getDocumentHeight()
  if (currentHeight !== state.documentHeight) resetFn()
  state.documentHeight = currentHeight
}
