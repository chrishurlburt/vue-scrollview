import flowright from 'lodash.flowright'
import throttle from 'lodash.throttle'

import { getElDistanceTop } from './helpers'
import {
  createScrollListener,
  checkInViewport,
  broadcastScrollviews,
  resetScrollviews
} from './scroll'

/**
 * Creates the initial state for tracking ScrollView children.
 *
 * @param {Object} options - options passed on plugin installation.
 * @returns {Object} The inital state object.
 */
export const initVueScrollview = ({ throttle, callbacks } = {}) => {
  const initialState = {
    callbacks,
    scrollviews: {},
    locations: [],
    tracking: {},
    bottom: 0
  }
  return flowright(
    attachRecacheListener,
    attachScrollListener
  )(initialState)
}

/**
 * Initializes a ScrollView $vm into tracking.
 *
 * @param {Object} ScrollView - The ScrollView $vm
 * @returns {Object} Component locations and ScrollViews being tracked.
 */
export const initializeScrollview = ({ _uid, $children }) => {
  return $children.reduce((data, { $el, $vnode: { key: child }}) => {
    const top = getElDistanceTop($el)
    const bottom = top + $el.clientHeight
    const position = { top, bottom }
    data.locations.push({
      position,
      scrollview: _uid,
      component: child
    })
    data.tracking[child] = false
    return data
  }, { locations: [], tracking: {}})
}

/**
 * Attaches the scroll listener.
 *
 * @param {Object} state - ScrollView tracking state.
 * @returns {Object} ScrollView tracking state.
 */
const attachScrollListener = (state) => {
  state.scrollListener = throttle(
    createScrollListener(state, checkInViewport, broadcastScrollviews, ...state.callbacks),
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
const attachRecacheListener = (state) => {
  state.recacheEl = document.createElement('span')
  state.recacheEl.setAttribute('id', 'scrollview-recache')
  document.body.appendChild(state.recacheEl)
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
const checkIfRecache = (state, resetFn) => {
  const currentBottom = getElDistanceTop(state.recacheEl)
  if (currentBottom !== state.bottom) resetFn()
  state.bottom = currentBottom
}
