export default {

  render (h) {
    return h(`h${this.weight}`, { style: { textAlign: 'center' }}, this.content)
  },

  props: {
    weight: {
      type: Number,
      default: () => 1
    },
    content: {
      type: String,
      required: true
    }
  }

}
