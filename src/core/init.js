import flowright from 'lodash.flowright'
import throttle from 'lodash.throttle'

import { getElDistanceTop } from './helpers'
import {
  createScrollListener,
  checkInViewport,
  broadcastScrollviews,
  resetScrollviews
} from './scroll'

export const initVueScrollview = ({ throttle, callbacks } = {}) => {
  const initialState = {
    callbacks,
    scrollY: window.scrollY,
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

export const initializeScrollview = ({ _uid, $children }) => {
  return $children.reduce((data, { $el, $vnode: { key: child }}) => {
    const position = getElDistanceTop($el)
    data.locations.push({
      position,
      scrollview: _uid,
      component: child
    })
    data.tracking[child] = false
    return data
  }, { locations: [], tracking: {}})
}

const attachScrollListener = (state) => {
  state.scrollListener = throttle(
    createScrollListener(state, checkInViewport, broadcastScrollviews, ...state.callbacks),
    state.throttle,
    { leading: true }
  )
  document.addEventListener('scroll', state.scrollListener, false)
  return state
}

const attachRecacheListener = (state) => {
  state.recacheEl = document.createElement('span')
  state.recacheEl.setAttribute('id', 'scrollview-recache')
  document.querySelector('body').appendChild(state.recacheEl)
  setInterval(() => checkIfRecache(state, () => resetScrollviews(state)), 1000)
  return state
}

const checkIfRecache = (state, resetFn) => {
  const currentBottom = getElDistanceTop(state.recacheEl)
  if (currentBottom !== state.bottom) resetFn()
  state.bottom = currentBottom
}
