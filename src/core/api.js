import { keysAreUnique, fetchComponentByKey } from './helpers'
import { initializeScrollview } from './init'
import { checkInViewport, resetScrollviews } from './scroll'

export const _private = (state) => ({

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

  _untrack: ({ _uid }) => {
    delete state.tracking[_uid]
    state.locations = state.locations.filter(location => location.scrollview !== _uid)
  }

})

export const _public = (state) => ({

  scrollToComponent: (key, offset) => {
    const { position, scrollview } = fetchComponentByKey(key, state.locations)
    const { offset: defaultOffset } = state.scrollviews[scrollview]
    const scrollOffset = (offset !== undefined) ? offset : defaultOffset
    window.scrollTo(0, position - scrollOffset)
    state.scrollListener()
  },

  forceRefresh: () => {
    resetScrollviews(state)
    state.scrollListener()
  },

  getComponentLocation: (key) => {
    const { position } = fetchComponentByKey(key, state.locations)
    return position
  }

})
