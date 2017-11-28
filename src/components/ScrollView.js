import { $scrollview } from '../index'

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
      tracking: {}
    }
  },
  mounted () {
    // make sure scrollview has been initialized with the proper
    // listeners.
    $scrollview._initVueScrollview()
    this.tracking = $scrollview._track(this)
    this.$on('tracking:update', update => this.tracking = update)
    this.$on('tracking:reset', () => this.tracking = $scrollview._track(this))
  },
  beforeDestroy () {
    $scrollview._untrack(this)
  },
  props: {
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
