import { initVueScrollview } from './core/init'
import { _public, _private } from './core/api'
import ScrollView from './ScrollView'

let $scrollview

function plugin (Vue, options = {}) {
  const throttle = options.throttle || 50
  const callbacks = options.callbacks || []
  const state = initVueScrollview({ throttle, callbacks })

  $scrollview = {
    state,
    ..._private(state),
    ..._public(state)
  }

  Vue.component('ScrollView', ScrollView)
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
  $scrollview,
  version
}
