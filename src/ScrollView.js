import Tracker from './tracker'

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
        this.tracking = this.tracker.track(this)
      }
    }
  },
  created () {
    this.tracker = new Tracker()
  },
  mounted () {
    if (this.ready) this.tracking = this.tracker.track(this)
    this.$on('tracking:update', update => this.tracking = update)
  },
  beforeDestroy () {
    this.tracker.untrack(this)
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
    tag: {
      type: String,
      default: () => 'span'
    }
  }
}
