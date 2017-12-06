export default {

  render (h) {
    return h(`h${this.weight}`, { class: ['heading'] }, this.content)
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
