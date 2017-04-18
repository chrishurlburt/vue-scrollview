import throttle from 'lodash.throttle'

export default {
  render (h) {
    return h(
      this.tag,
      [
        this.$scopedSlots.default(this.tracked)
      ],
    )
  },
  data () {
    return {
      tracked: {},
      locations: {},
      scrollListener: undefined,
      initialized: false,
      scrollY: undefined
    }
  },
  watch: {
    ready (val) {
      if (val && !this.initialized) this.initialSetup()
    }
  },
  methods: {
    initialSetup () {
      this.setComponentsTracking()
      this.setComponentsLocations()
      this.scrollY = window.scrollY
      this.initScrollListener()
      this.listenForRecallibrate()
      this.initialized = true
    },
    setComponentsTracking () {
      this.$scopedSlots.default(this.tracked).reduce((acc, vnode) => {
        if (vnode.key) this.$set(acc, vnode.key, false)
        return acc
      }, this.tracked)
    },
    setComponentsLocations () {
      this.$children.reduce((acc, child) => {
        return this.$set(this.locations, child.$vnode.key, getElDistanceTop(child.$el))
      }, this.locations)
    },
    initScrollListener () {
      this.scrollListener = throttle(this.checkInViewport, this.throttle, { leading: true })
      document.addEventListener('scroll', this.scrollListener, false)
    },
    checkInViewport () {
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
    },
    listenForRecallibrate () {
      ['DOMContentLoaded', 'load', 'resize']
        .forEach(event => window.addEventListener(event, this.setComponentsLocations, false))
    }
  },
  mounted () {
    if (this.ready) this.initialSetup()
  },
  beforeDestroy () {
    document.removeEventListener('scroll', this.scrollListener)
  },
  props: {
    ready: {
      type: Boolean,
      required: true
    },
    offset: {
      type: Number,
      default: () => 200
    },
    throttle: {
      type: Number,
      default: () => 50
    },
    tag: {
      type: String,
      default: () => 'span'
    }
  }
}

function getElDistanceTop (el) {
  let location = 0
  if (el.offsetParent) {
    do {
      location += el.offsetTop
      el = el.offsetParent
    } while (el)
  }
  return location >= 0 ? location : 0
}
