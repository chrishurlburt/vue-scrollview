// @flow
import type { State, ScrollviewComponent } from '../../types'

import throttle from 'lodash.throttle'

import { getElDistanceTop, getElPosition } from './helpers'
import {
  createScrollListener,
  checkInViewport,
  broadcastScrollviews,
  resetScrollviews
} from './scroll'

/**
 * Initializes a ScrollView $vm into tracking.
 *
 * @param {Object} ScrollView - The ScrollView $vm
 * @returns {Object} Component locations and ScrollViews being tracked.
 */
export const initializeScrollview = ({ _uid, $children }: ScrollviewComponent) => {
  return $children.reduce((data, { $el, $vnode: { key: child }}) => {
    const position = getElPosition($el)
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
export const attachScrollListener = (state: State) => {
  state.scrollListener = throttle(
    createScrollListener(state, [checkInViewport, broadcastScrollviews, ...state.callbacks]),
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
  state.recacheEl = document.createElement('span')
  state.recacheEl.setAttribute('id', 'scrollview-recache')
  if (document.body && state.recacheEl) document.body.appendChild(state.recacheEl)
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
  if (state.recacheEl) {
    const currentBottom = getElDistanceTop(state.recacheEl)
    if (currentBottom !== state.bottom) resetFn()
    state.bottom = currentBottom
  }
}
