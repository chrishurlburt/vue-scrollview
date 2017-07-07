import ScrollView from './ScrollView'
import Tracker from './tracker.js'

function plugin (Vue, options = {}) {
  const throttle = options.throttle || 50
  const callbacks = options.callbacks || []
  new Tracker({ throttle, callbacks })
  Vue.component('ScrollView', ScrollView)
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
const version = '__VERSION__'
// Export all components too
export {
  ScrollView,
  version
}
