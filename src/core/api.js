import flowright from 'lodash.flowright'

import { keysAreUnique, fetchComponentByKey } from './helpers'
import {
  initializeScrollview,
  attachScrollListener,
  attachRecacheListener
} from './init'
import { checkInViewport, resetScrollviews } from './scroll'

export const _private = (state) => ({

  /**
   * Initiates tracking on a new scrollview component.
   *
   * @param {Object} ScrollView - A ScrollView $vm
   * @returns {(Object|Error)} Tracking object for scrollview's child components or error if conflicting keys.
   */
  _track: (scrollview) => {
    if (keysAreUnique(state, scrollview.$children)) {
      state.scrollviews[scrollview._uid] = scrollview
      const { tracking, locations } = initializeScrollview(scrollview)
      state.locations = state.locations.concat(locations)
      state.tracking[scrollview._uid] = tracking
      checkInViewport(state)
      return state.tracking[scrollview._uid]
    } else {
      throw Error('[vue-scrollview]: Keys for components in a scrollview instance must be unique across all instances of scrollview.')
    }
  },

  /**
   * Removes a scrollview from tracking when it's destroyed.
   *
   * @param {Object} ScrollView - A ScrollView $vm
   * @returns null
   */
  _untrack: ({ _uid }) => {
    delete state.tracking[_uid]
    delete state.scrollviews[_uid]
    state.locations = state.locations.filter(location => location.scrollview !== _uid)
  },

  /**
   * Sets up the scroll listener and recache listener. This gets
   * called in the mounted hook of every scrollview component for SSR
   * compatibility. The listeners are only actually attached if they
   * havent already been by a previous invocation.
   *
   * @param {Object} options - options passed on plugin installation.
   * @returns {Object} The inital state object.
   */
  _initVueScrollview: () => {
    if (!state.scrollListener && !state.recacheEl) {
      return flowright(
        attachRecacheListener,
        attachScrollListener
      )(state)
    }
  }

})

export const _public = (state) => ({

  /**
   * Scrolls the page to a component.
   *
   * @param {(Number|String)} key - The key the component was set to track by.
   * @param {Number} [offset] - Defaults to the offset set in the ScrollViews props.
   * @returns null
   */
  scrollToComponent: (key, offset) => {
    const { position, scrollview } = fetchComponentByKey(key, state.locations)
    const { offset: defaultOffset } = state.scrollviews[scrollview]
    const scrollOffset = (offset !== undefined) ? offset : defaultOffset
    window.scrollTo(0, position.top - scrollOffset)
    state.scrollListener()
  },

  /**
   * DEPRECATED: see refresh()
   *
   * @returns null
   */
  forceRefresh: () => {
    console.warn(
      '[vue-scrollview]: $scrollview.forceRefresh() is deprecated and will be removed in the next major version. Please use $scrollview.refresh() instead.'
    )
    resetScrollviews(state)
  },

  /**
   * Force refreshes the locations of components being tracked by scrollviews.
   *
   * @returns null
   */
  refresh: () => resetScrollviews(state),

  /**
   * Fetches a components distance from the top of the viewport.
   *
   * @param {(Number|String)} key - The key the component was set to track by.
   * @returns {Number}
   */
  getComponentLocation: (key) => {
    const { position } = fetchComponentByKey(key, state.locations)
    return position
  }

})
