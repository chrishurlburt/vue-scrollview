import throttle from 'lodash.throttle'

class Tracker {

  construct (throttleBy) {
    this.scrollY = window.scrollY
    this.bindListeners(throttleBy)
  }

  bindListeners (throttleBy) {
    this._scrollListener = throttle(this.scrollListener, throttleBy, { leading: true })
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
    // emit event on all scrollviews to recalculate their components' locations
  }

  scrollListener () {
    const down = this.scrollY < window.scrollY
    Object.keys(this.locations).forEach((key) => {
      const toTopOfViewport = this.locations[key] - window.scrollY
      if (down) {
        // scrolling down
        if (toTopOfViewport <= window.innerHeight - this.offset && toTopOfViewport > 0) {
          this.tracked[key] = true
        } else {
          this.tracked[key] = false
        }
      } else if (toTopOfViewport <= window.innerHeight && toTopOfViewport > this.offset) {
          // scrolling up
        this.tracked[key] = true
      } else {
        this.tracked[key] = false
      }
    })
    this.scrollY = window.scrollY
  }

  track () {

  }
}

const tracker = new Tracker()
export default tracker
