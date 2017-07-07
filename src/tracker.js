import throttle from 'lodash.throttle'
import { getElDistanceTop } from './helpers'

let instance

class Tracker {

  constructor ({ throttle, callbacks } = {}) {
    if (!instance) {
      this.scrollY = window.scrollY
      this.callbacks = callbacks
      this.scrollviews = {}
      this.locations = []
      this.tracking = {}

      this.bindListeners(throttle)
      instance = this
    }
    return instance
  }

  bindListeners (throttleBy) {
    this._scrollListener = throttle(this.scrollListener.bind(this), throttleBy, { leading: true })
    document.addEventListener('scroll', this._scrollListener, false)
    ;['resize']
      .forEach(
        event => window.addEventListener(
          event,
          throttle(this.resetScrollviews.bind(this), throttleBy),
          false
        )
      )
  }

  resetScrollviews () {
    // this.locations = this.locations.map(location => {
    //   const component = this.scrollviews[location.scrollview].$children
    //     .find(child => child.$vnode.key === location.component).$el
    //   location.position = getElDistanceTop(component)
    //   return location
    // })
  }

  scrollListener () {
    window.requestAnimationFrame(() => {
      this.checkInViewport()
      this.broadcastScrollviews()
      this.callbacks.forEach(cb => cb())
    })
  }

  checkInViewport () {
    const down = this.scrollY <= window.scrollY
    this.locations.forEach(({ position, scrollview, component }) => {
      const toTopOfViewport = position - window.scrollY
      const { offset } = this.scrollviews[scrollview]
      if (down) {
        // scrolling down
        if (toTopOfViewport <= window.innerHeight - offset && toTopOfViewport > 0) {
          this.tracking[scrollview][component] = true
        } else {
          this.tracking[scrollview][component] = false
        }
      } else if (toTopOfViewport <= window.innerHeight && toTopOfViewport > offset) {
          // scrolling up
        this.tracking[scrollview][component] = true
      } else {
        this.tracking[scrollview][component] = false
      }
    })
    this.scrollY = window.scrollY
  }

  broadcastScrollviews () {
    Object.keys(this.scrollviews)
      .forEach(id => this.scrollviews[id].$emit('tracking:update', this.tracking[id]))
  }

  keysAreUnique (children) {
    const exists = children.find(({ $vnode: { key }}) => {
      const match = this.locations.find(({ component }) => {
        return component === key
      })
      return !!(match)
    })
    return !(exists)
  }

  initializeScrollview ({ _uid, $children }) {
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

  track (scrollview) {
    if (this.keysAreUnique(scrollview.$children)) {
      this.scrollviews[scrollview._uid] = scrollview
      const { tracking, locations } = this.initializeScrollview(scrollview)
      this.locations = this.locations.concat(locations)
      this.tracking[scrollview._uid] = tracking
      this.checkInViewport()
      return this.tracking[scrollview._uid]
    } else {
      throw Error('[vue-scrollview]: Keys for components in a scrollview instance must be unique across all instances of scrollview.')
    }
  }

  untrack ({ _uid }) {
    delete this.tracking[_uid]
    this.locations = this.locations.filter(location => location.scrollview !== _uid)
  }

}

export default Tracker
