import { tracker } from './tracker'

export default {
  render (h) {
    return h(
      this.tag,
      [
        this.$scopedSlots.default(this.tracking)
      ]
    )
  },
  data () {
    return {
      tracking: {},
      initialized: false
    }
  },
  watch: {
    ready (ready) {
      if (ready && !this.initialized) {
        this.tracking = tracker.track(this)
        this.initialized = true
      }
    }
  },
  updated () {
    // reset tracking for components, new ones were probably added
    tracker.update(this)
  },
  mounted () {
    if (this.ready) {
      this.tracking = tracker.track(this)
      this.initialized = true
    }
    this.$on('tracking:update', update => this.tracking = update)
  },
  beforeDestroy () {
    // document.removeEventListener('scroll', this.scrollListener)
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
