export default {
  render (h) {
    return h(
      'div',
      {
        class: ['vue-scrollview__marker', { debug: this.debug }],
        style: this.markerStyle
      },
      [
        h(
          'span',
          {
            class: 'vue-scrollview__marker--name',
            style: this.markerNameStyle
          },
          this.name
        )
      ]
    )
  },
  watch: {
    visible (isVisible) {
      if (isVisible) this.$emit('isVisible', this.name)
      else this.$emit('isNotVisible', this.name)
    }
  },
  computed: {
    markerStyle () {
      return {
        position: 'relative',
        width: '100%',
        height: '1px',
        marginTop: `${this.spacing}px`,
        backgroundColor: this.debug ? 'red' : 'transparent'
      }
    },
    markerNameStyle () {
      return {
        display: this.debug ? 'block' : 'none',
        position: 'absolute',
        bottom: '100%',
        left: '20px',
        color: 'red',
        fontSize: '14px'
      }
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      default: () => false
    },
    spacing: {
      type: Number,
      default: () => 300
    },
    debug: {
      type: Boolean,
      default: () => false
    }
  }
}
