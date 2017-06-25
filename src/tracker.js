import throttle from 'lodash.throttle'
import { getElDistanceTop } from './helpers'

class Tracker {

  constructor (throttleBy) {
    this.scrollY = window.scrollY
    this.scrollviews = []
    this.locations = []
    this.tracking = {}
    this.bindListeners(throttleBy)
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
    this.checkInViewport()
    this.broadcastScrollviews()
  }

  // @TODO: fixed hardcoded offset
  checkInViewport () {
    const down = this.scrollY <= window.scrollY
    this.locations.forEach(({ position, scrollview, component }) => {
      const toTopOfViewport = position - window.scrollY
      if (down) {
        // scrolling down
        if (toTopOfViewport <= window.innerHeight - 200 && toTopOfViewport > 0) {
          this.tracking[scrollview][component] = true
        } else {
          this.tracking[scrollview][component] = false
        }
      } else if (toTopOfViewport <= window.innerHeight && toTopOfViewport > 200) {
          // scrolling up
        this.tracking[scrollview][component] = true
      } else {
        this.tracking[scrollview][component] = false
      }
    })
    this.scrollY = window.scrollY
  }

  broadcastScrollviews () {
    this.scrollviews
      .forEach(scrollview => scrollview.$emit('tracking:update', this.tracking[scrollview._uid]))
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
      this.scrollviews.push(scrollview)
      const { tracking, locations } = this.initializeScrollview(scrollview)
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

export const tracker = new Tracker()
