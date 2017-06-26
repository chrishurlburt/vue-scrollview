import throttle from 'lodash.throttle'
import { getElDistanceTop } from './helpers'

let instance

class Tracker {

  constructor ({ throttle } = {}) {
    if (!instance) {
      instance = this
    }

    this.scrollY = window.scrollY
    this.scrollviews = {}
    this.locations = []
    this.tracking = {}
    this.bindListeners(throttle)

    return instance
  }

  bindListeners (throttleBy) {
    this._scrollListener = throttle(this.scrollListener.bind(this), throttleBy, { leading: true })
    document.addEventListener('scroll', this._scrollListener, false)
    ;['DOMContentLoaded', 'load', 'resize']
      .forEach(
        event => window.addEventListener(
          event,
          throttle(this.resetScrollviews, throttleBy),
          false
        )
      )
  }

  resetScrollviews () {

  }

  scrollListener () {
    window.requestAnimationFrame(() => {
      this.checkInViewport()
      this.broadcastScrollviews()
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

  track (scrollview, options) {
    if (this.keysAreUnique(scrollview.$children)) {
      this.scrollviews[scrollview._uid] = scrollview
      const { tracking, locations } = this.initializeScrollview(scrollview, options)
      this.locations = this.locations.concat(locations)
      this.tracking[scrollview._uid] = tracking
      this.checkInViewport()
      return this.tracking[scrollview._uid]
    } else {
      throw Error('[vue-scrollview]: Keys for components in a scrollview instance must be unique across all instances of scrollview.')
    }
  }

  update () {

  }
}

export default Tracker
