// @flow
import 'core-js/fn/array/find'
import { _public, _private } from './core/api'
import ScrollView from './components/ScrollView'
import ScrollMarker from './components/ScrollMarker'
let $scrollview

function plugin (Vue: Function, options: Object = {}) {
  const throttle = options.throttle || 50
  const callbacks = options.callbacks || []

  const initialState: State = {
    callbacks,
    throttle,
    scrollviews: {},
    locations: [],
    tracking: {},
    scrollDirection: 'DOWN',
    previousScrollLocation: 0,
    documentHeight: 0,
    lastComponent: {},
    firedOnLastEntered: false,
    onLastEntered: () => {}
  }

  $scrollview = {
    state: initialState,
    set onLastEntered (fn) {
      if (typeof fn !== 'function') {
        console.error('[vue-scrollview]: onLastEntered expects a function.')
      } else {
        initialState.onLastEntered = fn
        this._onLastEntered = fn
      }
    },
    get onLastEntered () {
      return this._onLastEntered
    },
    ..._private(initialState),
    ..._public(initialState)
  }

  Vue.component('ScrollView', ScrollView)
  Vue.component('ScrollMarker', ScrollMarker)
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
  window.Vue.$scrollview = $scrollview
}

export default plugin
const version = '__VERSION__'
// Export all components too
export {
  ScrollView,
  ScrollMarker,
  $scrollview,
  version
}
